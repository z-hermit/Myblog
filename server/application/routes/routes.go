package routes

import (
	CO "github.com/iris-contrib/Iris-Mini-Social-Network/config"

	"github.com/kataras/iris"
	"golang.org/x/crypto/bcrypt"
	"mywork.com/Myblog/server/domain/models"
)

func hash(password string) []byte {
	hash, hashErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	CO.Err(hashErr)
	return hash
}

func json(ctx iris.Context, code int, msg string, data interface{}) {
	ctx.JSON(models.JsonResponse{code, msg, data})
}

func ses(ctx iris.Context) interface{} {
	id, username := CO.AllSessions(ctx)
	return map[string]interface{}{
		"id":       id,
		"username": username,
	}
}

func loggedIn(ctx iris.Context, urlRedirect string) {
	var URL string
	if urlRedirect == "" {
		URL = "/login"
	} else {
		URL = urlRedirect
	}
	id, _ := CO.AllSessions(ctx)
	if id == "" {
		ctx.Redirect(URL)
	}
}

func notLoggedIn(ctx iris.Context) {
	id, _ := CO.AllSessions(ctx)
	// println("the user id is: " + id)
	if id != "" {
		ctx.Redirect("/")
	}
}

func invalid(ctx iris.Context, what int) {
	if what == 0 {
		ctx.Redirect("/404")
	}
}
