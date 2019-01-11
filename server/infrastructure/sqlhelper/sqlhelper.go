package sqlhelper

import (
	"database/sql"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/kataras/iris/core/errors"
	"github.com/spf13/viper"
	"mywork.com/Myblog/server/config"
	"mywork.com/Myblog/server/infrastructure/datamodels"
)

var dbarg string

func Myinit() {
	dbarg = config.SqlConfig()

	MigrateTable(datamodels.User{})
	MigrateTable(datamodels.Follow{})
	MigrateTable(datamodels.Like{})
	MigrateTable(datamodels.Post{})
	MigrateTable(datamodels.ProfileView{})
}

func MigrateTable(tableP interface{}) error {
	return GormBD().AutoMigrate(tableP).Error
}

func CreateTable(tableName string, tableP interface{}) error {
	return GormBD().Table(tableName).CreateTable(tableP).Error
}

//params 按照字典序传入
func Insert(eleP interface{}) (interface{}, error) {
	if GormBD().NewRecord(eleP) {
		result := GormBD().Create(eleP)
		return result.Value, result.Error
	}
	//TODO log
	result := GormBD().Set("gorm:insert_option", "ON CONFLICT REPLACE").Create(eleP)
	return result.Value, result.Error
}

func Save(eleP interface{}) {
	GormBD().Save(eleP)
}

func Update(eleP interface{}, updateField map[string]interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return GormBD().Model(eleP).Update(updateField).Error
	} else {
		return GormBD().Model(eleP).Where(queryKey, queryValue...).Update(updateField).Error //eleP must as &User{}, no primary key
	}
	return nil
}

func Delete(eleP interface{}, queryKey string, queryValue string) error {
	rows, _ := GormBD().Model(eleP).Rows()
	if rows.Next() {
		return errors.New("sqlhelper: delete too many rows")
	}

	return GormBD().Delete(eleP).Error
}

func Select(eleAP interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return GormBD().Find(eleAP).Error
	} else {
		return GormBD().Where(queryKey, queryValue...).Find(eleAP).Error
	}
	return nil
}

func SelectRandom(eleAP interface{}, limit int, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return GormBD().Limit(limit).Set("gorm:query_option", "ORDER BY RAND()").Find(eleAP).Error
	} else {
		return GormBD().Limit(limit).Set("gorm:query_option", "ORDER BY RAND()").Where(queryKey, queryValue...).Find(eleAP).Error
	}
	return nil
}

func Count(table string, queryKey string, queryValue ...interface{}) int {
	var count int
	sql := fmt.Sprintf("SELECT COUNT(*) AS count FROM %s WHERE %s", table, queryKey)
	DB().QueryRow(sql, queryValue...).Scan(&count)
	return count
}

func SelectOne(eleP interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return GormBD().First(eleP).Error
	} else {
		return GormBD().Where(queryKey, queryValue...).First(eleP).Error
	}
	return nil
}

func DB() *sql.DB {
	mysqlconfig := viper.GetStringMap("mysql")
	user := mysqlconfig["user"].(string)
	password := mysqlconfig["pass"].(string)
	host := mysqlconfig["host"].(string)
	_db := mysqlconfig["dbname"].(string)

	db, _ := sql.Open("mysql", user+":"+password+"@tcp("+host+":3306)/"+_db)
	return db
}

func GormBD() *gorm.DB {

	db, err := gorm.Open("mysql", dbarg)
	if err != nil {
		fmt.Println(err)
	}
	return db
}
