package main

import (
	"github.com/gofiber/fiber/v2"
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

	todos := []Todo{}

	app.Get("/api/v1/health-check", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/api/v1/todo", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.JSON(todo)
	})

	log.Fatal(app.Listen(":9999"))
}
