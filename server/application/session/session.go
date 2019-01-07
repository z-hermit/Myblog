package session

import (
	"github.com/gorilla/securecookie"
	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
	"github.com/spf13/viper"
	"log"
	"time"
)

var manager *sessions.Sessions

func init() {
	// These should be initialized when godotenv inited,
	// the original repository has a bug here and the session secret
	// never loads because the "config" packages inits first.

	var (
		hashKey  = []byte(viper.GetString("SESSION_HASH_SECRET"))
		blockKey = []byte(viper.GetString("SESSION_BLOCK_SECRET"))
	)
	var secureCookie = securecookie.New(hashKey, blockKey)

	manager = sessions.New(sessions.Config{
		Cookie: "session_id",
		Encode: secureCookie.Encode,
		Decode: secureCookie.Decode,
	})

	// println("hashKey = " + string(hashKey))
	// println("blockKey = " + string(blockKey))
}

// GetSession to return the session
func GetSession(ctx iris.Context) *sessions.Session {
	return manager.Start(ctx)
}

// AllSessions function to return all the sessions
func UserSessions(ctx iris.Context) (int, string) {
	session := GetSession(ctx)
	id, _ := session.GetInt("id")
	username := session.GetString("username")
	return id, username
}

// MakeTimestamp function
func MakeTimestamp() int64 {
	return time.Now().UnixNano() / (int64(time.Millisecond) / int64(time.Nanosecond))
}

// Err Log
func LogErr(err interface{}) {
	if err != nil {
		log.Fatal(err)
	}
}

func MeOrNot(ctx iris.Context, userId int) bool {
	id, _ := UserSessions(ctx)
	if id != userId {
		return false
	}
	return true
}
