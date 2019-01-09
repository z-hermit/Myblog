package infrastructure

import (
	// for mysql
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

// DB function
func DB() *gorm.DB {
	mysqlconfig := viper.GetStringMap("mysql")
	user := mysqlconfig["user"].(string)
	password := mysqlconfig["pass"].(string)
	host := mysqlconfig["host"].(string)
	_db := mysqlconfig["dbname"].(string)
	db, err := gorm.Open("mysql", user+":"+password+"@tcp("+host+":3306)/"+_db+"?charset=utf8&parseTime=true&loc=Local")
	if err != nil {
		fmt.Println(err)
	}
	return db
}
