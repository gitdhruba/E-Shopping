package main

import (
	"github.com/gofiber/fiber/v2"
	"main.go/database"
	"main.go/router"
)

func main() {
	// Start a new fiber app
	nf := fiber.New()

	//connect database
	database.ConnectDB()

	//create router
	router.SetupRoutes(nf)

	/*nf.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404) // => 404 "Not Found"
	})
	*/

	nf.Static("/", "./fend/root")
	nf.Static("/api/user/private/user", "./fend/private")

	//listen to port 8000
	nf.Listen(":8000")

}
