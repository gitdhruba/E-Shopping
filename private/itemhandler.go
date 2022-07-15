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
		Quantity uint32 `json:"quantity"`
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
		User:       fmt.Sprint(models.VerifiedUser),
		Bookid:     input.Bookid,
		Bookname:   input.Bookname,
		Time:       fmt.Sprint(0),
		Quantity:   input.Quantity,
		Totalprice: input.Price,
	}

	fmt.Println(item)

	var qnt uint32
	res := db.DB.Select("quantity").Where("bookid = ?", input.Bookid).Find(&models.BookStock{})
	res.Scan(&qnt)
	fmt.Println(qnt)

	if qnt < input.Quantity {
		return c.JSON(fiber.Map{
			"error": true,
			"msg":   "out of stock",
		})
	} else {
		qnt = qnt - input.Quantity
		book := new(models.BookStock)
		err := db.DB.Model(&book).Where("bookid = ?", input.Bookid).Update("quantity", qnt).Error
		if err != nil {
			fmt.Println("update error: ")
			fmt.Println(err)
		}
	}

	err := db.DB.Create(&item).Error
	if err != nil {
		fmt.Println("insert error")
		fmt.Println(err)
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
		Time     string `json:"time"`
		Quantity uint32 `json:"quantity"`
		Price    uint64 `json:"price"`
	}

	input := new(iteminput)
	if err := c.BodyParser(input); err != nil {
		return c.JSON(fiber.Map{
			"error":  true,
			"status": "incorrect input",
		})
	}

	var qnt uint32
	res := db.DB.Select("quantity").Where("bookid = ?", input.Bookid).Find(&models.BookStock{})
	res.Scan(&qnt)
	fmt.Println(qnt)
	qnt = qnt + input.Quantity
	book := new(models.BookStock)
	err := db.DB.Model(&book).Where("bookid = ?", input.Bookid).Update("quantity", qnt).Error
	if err != nil {
		fmt.Println("update error: ")
		fmt.Println(err)
	}

	item := new(models.Item)
	if res := db.DB.Where("\"user\" = ? AND bookid = ? AND time = ?", models.VerifiedUser, input.Bookid, input.Time).Delete(&item); res.RowsAffected <= 0 {
		return c.JSON(fiber.Map{
			"msg": "invalid input",
		})
	}

	var books []models.BookStock
	var sbook models.BookStock

	for id := 1; id <= 2; id++ {
		search := db.DB.Where("bookid = ?", id).Find(&book)
		search.Scan(&sbook)
		books = append(books, sbook)

	}

	fmt.Println(books)

	/*return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "cancellation successfull",
	})*/

	return c.Status(fiber.StatusOK).JSON(books)

}

//function for adding items to the cart
func AddtoCart(c *fiber.Ctx) error {

	type iteminput struct {
		Bookid   uint32 `json:"bookid"`
		Quantity uint32 `json:"quantity"`
	}

	input := new(iteminput)
	if err := c.BodyParser(input); err != nil {
		return c.JSON(fiber.Map{
			"status": "incorrect input",
		})
	}

	var book models.BookStock
	res := db.DB.Where("bookid = ?", input.Bookid).Find(&models.BookStock{})
	res.Scan(&book)

	cartitem := models.Cart{
		User:       fmt.Sprint(models.VerifiedUser),
		Bookid:     input.Bookid,
		Bookname:   book.Bookname,
		Time:       "0",
		Quantity:   input.Quantity,
		Totalprice: (uint64(input.Quantity * uint32(book.Price))),
	}

	if err := db.DB.Create(&cartitem).Error; err != nil {
		fmt.Println("insert error")
		fmt.Println(err)
		return c.JSON(fiber.Map{
			"error": err,
			"msg":   "Something went wrong, please try again later. 😕",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "adding to cart successfull",
	})

}
