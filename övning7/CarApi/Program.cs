using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
// =========================================================
// 1. CORS-inställningar (så att JavaScript-kod kan anropa alla metoder)
// =========================================================
#region

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()  // Tillåter GET, POST, PUT, DELETE
              .AllowAnyHeader();
    });
});
#endregion

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =========================================================
// 2. Registrera databaskontexten (SQLite)
// =========================================================
#region
builder.Services.AddDbContext<VehicleContext>(options =>
    options.UseSqlite("Data Source=cars.db"));
#endregion

var app = builder.Build();
// Aktivera Swagger-gränssnittet
app.UseSwagger();
app.UseSwaggerUI();
// Aktivera Cors
app.UseCors();

// =========================================================
// 3. SEEDING: Lägg till startdata om databasen är tom
// =========================================================
#region
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<VehicleContext>();
    db.Database.EnsureCreated();

    if (!db.Cars.Any())
    {
        var brands = new[]
        {
            "Volvo", "Saab", "Opel", "Volkswagen", "Ford", "Toyota", "BMW", "Mercedes-Benz",
            "Audi", "Peugeot", "Renault", "Fiat", "Skoda", "Mazda", "Nissan", "Honda",
            "Citroën", "Subaru", "Kia", "Hyundai"
        };
        var models = new[]
        {
            "244 GL", "900 T", "245 GLT", "Ascona", "Golf", "Escort", "Corolla", "3-serie",
            "190 E", "80", "205", "Clio", "Panda", "Octavia", "323", "Civic",
            "Berlingo", "Impreza", "Rio", "i30"
        };
        var colors = new[] { "Blå", "Röd", "Vit", "Brun", "Svart", "Grön", "Grå", "Silver", "Gul", "Orange" };

        var cars = Enumerable.Range(1, 100).Select(id => new Car
        {
            Id = id,
            Brand = brands[id % brands.Length],
            Model = models[(id * 7) % models.Length],
            Year = 1970 + (id * 13) % 55,
            Color = colors[(id * 3) % colors.Length]
        });

        db.Cars.AddRange(cars);
        db.SaveChanges();
    }
}
#endregion

// =========================================================
// 4. API ENDPOINTS (FULL CRUD)
// =========================================================
#region
// READ ALL (GET /api/cars)
app.MapGet("/api/cars", async (VehicleContext db) =>
    Results.Ok(await db.Cars.ToListAsync()));

// READ ONE (GET /api/cars/{id})
app.MapGet("/api/cars/{id:int}", async (int id, VehicleContext db) =>
    await db.Cars.FindAsync(id) is Car bil
        ? Results.Ok(bil)
        : Results.NotFound($"Bil med ID {id} hittades inte."));

// CREATE (POST /api/cars) - Nivå 2
app.MapPost("/api/cars", async (Car bil, VehicleContext db) =>
{
    db.Cars.Add(bil);
    await db.SaveChangesAsync();
    return Results.Created($"/api/cars/{bil.Id}", bil);
});

// UPDATE (PUT /api/cars/{id}) - Nivå 4
app.MapPut("/api/cars/{id:int}", async (int id, Car bilInput, VehicleContext db) =>
{
    var car = await db.Cars.FindAsync(id);
    if (car is null) return Results.NotFound($"Bil med ID {id} hittades inte.");

    // Uppdatera egenskaperna
    car.Brand = bilInput.Brand;
    car.Model = bilInput.Model;
    car.Year = bilInput.Year;
    car.Color = bilInput.Color;

    await db.SaveChangesAsync();
    return Results.NoContent(); // Standardrespons vid lyckad uppdatering (204)
});

// DELETE (DELETE /api/cars/{id}) - Nivå 3
app.MapDelete("/api/cars/{id:int}", async (int id, VehicleContext db) =>
{
    var car = await db.Cars.FindAsync(id);
    if (car is null) return Results.NotFound($"Bil med ID {id} hittades inte.");

    db.Cars.Remove(car);
    await db.SaveChangesAsync();
    return Results.Ok(new { Message = $"Bilen med ID {id} har raderats." });
});
#endregion
app.Run();

// =========================================================
// 5. DATABASKONFIGURATION & MODELL
// =========================================================
#region
class VehicleContext : DbContext
{
    public VehicleContext(DbContextOptions<VehicleContext> options) : base(options) { }
    public DbSet<Car> Cars => Set<Car>();
}

class Car
{
    public int Id { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Color { get; set; } = string.Empty;
}
#endregion
