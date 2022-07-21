package router

import (
	"main.go/private"
	"main.go/util"
)

// SetupUserRoutes func sets up all the user routes
func SetupUserRoutes() {
	USER.Post("/signup", CreateUser) // Sign Up a user
	USER.Post("/signin", LoginUser)  // Sign In a user
	//USER.Get("/get-access-token", GetAccessToken) // returns a new access_token
	USER.Get("/googlelogin", GoogleLogin)
	USER.Get("/googlecallback", GoogleCallback)
	USER.Get("/getbookstock", GetBookStock)
	USER.Get("/getusername", GetUsername)

	// privUser handles all the private user routes that requires authentication
	privUser := USER.Group("/private")
	privUser.Use(util.SecureAuth()) // middleware to secure all routes for this group
	//privUser.Get("/user", GetUserData)
	//privUser.Post("/logout", private.LogOut)
	privUser.Post("/addentry", private.CreateEntry)
	privUser.Post("/deleteentry", private.DeleteEntry)
	privUser.Post("/addtocart", private.AddtoCart)
	privUser.Post("/deletefromcart", private.DeletefromCart)
	privUser.Get("/placecartorders", private.PlaceCartOrders)
	privUser.Get("/getcartdata", private.GetCartData)
	privUser.Get("/getpurchasedata", private.GetPurchaseData)

}
