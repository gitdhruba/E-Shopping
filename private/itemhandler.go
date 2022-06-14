package private

import (
	//"math/rand"
	//"time"

	db "main.go/database"
	"main.go/models"

	//"main.go/util"

	//"golang.org/x/crypto/bcrypt"

	//"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func CreateEntry(c *fiber.Ctx) error {
	item := new(models.Item)

	if err := c.BodyParser(item); err != nil {

		return c.JSON(fiber.Map{
			"error": true,
			"input": "Please review your input",
		})
	}

	err := db.DB.Create(&item)
	if err != nil {
		return c.JSON(fiber.Map{
			"error": true,
			"msg":   "Something went wrong, please try again later. 😕",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "order successfull",
	})
}
