using AdressBook.Api.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Database Context Info
builder.Services.AddDbContext<FieldReservationContext>(options =>
    options.UseSqlServer("Data Source=localhost;Initial Catalog=FieldReservation;User id=sa;Password=myDBpas12.WORD;TrustServerCertificate=True"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Activate Middleware
app.UseTraceMiddleware();
app.UseExceptionHandlerMiddleware();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
