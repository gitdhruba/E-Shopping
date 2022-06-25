package private

import (
	//"math/rand"
	//"time"

	"fmt"

	db "main.go/database"
	"main.go/models"

	//"main.go/util"

	//"golang.org/x/crypto/bcrypt"

	//"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

//function for entering purchased item details in DB
func CreateEntry(c *fiber.Ctx) error {

	type iteminput struct {
		Bookid   uint32 `json:"bookid"`
		Bookname string `json:"bookname"`
		Isbn     string `json:"isbn"`
		Price    uint64 `json:"price"`
	}

	input := new(iteminput)
	if err := c.BodyParser(input); err != nil {
		return c.JSON(fiber.Map{
			"error":  true,
			"status": "incorrect input",
		})
	}
	//fmt.Println(models.VerifiedUser)
	item := models.Item{
		User:     fmt.Sprint(models.VerifiedUser),
		Bookid:   input.Bookid,
		Bookname: input.Bookname,
		Isbn:     input.Isbn,
		Price:    input.Price,
	}

	fmt.Println(item)

	err := db.DB.Create(&item)
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err,
			"msg":   "Something went wrong, please try again later. 😕",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "order successfull",
	})
}

//function for removing purchased item data
func DeleteEntry(c *fiber.Ctx) error {

	type iteminput struct {
		Bookid   uint32 `json:"bookid"`
		Bookname string `json:"bookname"`
		Isbn     string `json:"isbn"`
		Price    uint64 `json:"price"`
	}

	input := new(iteminput)
	if err := c.BodyParser(input); err != nil {
		return c.JSON(fiber.Map{
			"error":  true,
			"status": "incorrect input",
		})
	}

	item := new(models.Item)

	if res := db.DB.Where("\"user\" = ? AND bookid = ? AND isbn = ?", models.VerifiedUser, input.Bookid, input.Isbn).Delete(&item); res.RowsAffected <= 0 {
		return c.JSON(fiber.Map{
			"msg": "invalid input",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "cancellation successfull",
	})
}
