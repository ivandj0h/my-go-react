package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	var todos []Todo

	// Health check
	app.Get("/api/v1/health-check", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	// Get all todos
	app.Get("/api/v1/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	// Create a new todo
	app.Post("/api/v1/todo", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.JSON(todo)
	})

	// Update a todo
	app.Patch("/api/v1/todo/:id/done", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(400).SendString("Invalid ID")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}
		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":9999"))
}
