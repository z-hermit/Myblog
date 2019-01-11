package config

import (
	"fmt"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigName("config")    // name of config file (without extension)
	viper.AddConfigPath("./")        // optionally look for config in the working directory
	viper.AddConfigPath("./config/") // optionally look for config in the working directory
	err := viper.ReadInConfig()      // Find and read the config file
	if err != nil {                  // Handle errors reading the config file
		fmt.Println("Fatal error config file:", err)
		return
	}
}

func SqlConfig() string {
	mysqlconfig := viper.GetStringMap("mysql")
	user := mysqlconfig["user"].(string)
	password := mysqlconfig["pass"].(string)
	host := mysqlconfig["host"].(string)
	_db := mysqlconfig["dbname"].(string)
	return user + ":" + password + "@tcp(" + host + ":3306)/" + _db + "?charset=utf8&parseTime=true&loc=Local"
}
