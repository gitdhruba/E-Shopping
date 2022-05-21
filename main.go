package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"main.go/database"
	"main.go/router"
)

/*
type Book struct {
	ID     string  `json:"id"`
	Isbn   string  `json:"isbn"`
	Title  string  `json:"title"`
	Author *Author `json:"author"`
}

type Author struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

var books []Book

func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	rid := mux.Vars(r)
	for _, item := range books {
		if item.ID == rid["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	json.NewEncoder(w).Encode(&Book{})

}

func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.ID = strconv.Itoa(rand.Intn(1000))
	books = append(books, book)
	json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {

}

func deleteBook(w http.ResponseWriter, r *http.Request) {

}
*/
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

	nf.Static("/", "./fend")

	//listen to port 8000
	log.Fatal(nf.Listen(":8000"))

	/*
		books = append(books, Book{ID: "1", Isbn: "123456", Title: "Book1", Author: &Author{Firstname: "ABC", Lastname: "EFG"}})
		books = append(books, Book{ID: "2", Isbn: "154894", Title: "Book2", Author: &Author{Firstname: "XYZ", Lastname: "EFG"}})

	*/
}
