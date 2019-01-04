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

	viper.SetConfigName("config") // name of config file (without extension)
	viper.AddConfigPath("./")     // optionally look for config in the working directory
	err := viper.ReadInConfig()   // Find and read the config file
	if err != nil {               // Handle errors reading the config file
		fmt.Println("Fatal error config file:", err)
		return nil
	}

	mysqlconfig := viper.GetStringMap("mysql")
	user := mysqlconfig["user"].(string)
	password := mysqlconfig["pass"].(string)
	host := mysqlconfig["host"].(string)
	_db := mysqlconfig["dbname"].(string)
	db, err := gorm.Open("mysql", user+":"+password+"@tcp("+host+":3306)/"+_db)
	if err != nil {
		fmt.Println(err)
	}
	return db
}
