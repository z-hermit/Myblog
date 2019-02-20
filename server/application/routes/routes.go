package routes

import (
	"fmt"
	"github.com/kataras/iris"
	"golang.org/x/crypto/bcrypt"
	"mywork.com/Myblog/server/application/session"
	"mywork.com/Myblog/server/domain/models"
)

func hash(password string) []byte {
	hash, hashErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	session.LogErr(hashErr)
	return hash
}

func json(ctx iris.Context, code int, msg string, data interface{}) {
	i, e := ctx.JSON(models.JsonResponse{code, msg, data})
	if e != nil {
		fmt.Println("json response: ", i, e)
	}
}

func ses(ctx iris.Context) interface{} {
	id, username := session.UserSessions(ctx)
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
	id, _ := session.UserSessions(ctx)
	fmt.Println(id)
	if id == 0 {
		ctx.Redirect(URL)
	}
}

func notLoggedIn(ctx iris.Context) {
	id, _ := session.UserSessions(ctx)
	// println("the user id is: " + id)
	if id != 0 {
		ctx.Redirect("/")
	}
}

func invalid(ctx iris.Context, what int) {
	if what == 0 {
		ctx.Redirect("/404")
	}
}
