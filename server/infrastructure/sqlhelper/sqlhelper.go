package sqlhelper

import (
	"database/sql"
	"github.com/kataras/iris/core/errors"
	"github.com/spf13/viper"
	"mywork.com/Myblog/server/infrastructure"
)

func MigrateTable(tableP interface{}) error {
	return infrastructure.DB().AutoMigrate(tableP).Error
}

func CreateTable(tableName string, tableP interface{}) error {
	return infrastructure.DB().Table(tableName).CreateTable(tableP).Error
}

//params 按照字典序传入
func Insert(eleP interface{}) error {
	if infrastructure.DB().NewRecord(eleP) {
		return infrastructure.DB().Create(eleP).Error
	} else {
		//TODO log
		return infrastructure.DB().Set("gorm:insert_option", "ON CONFLICT REPLACE").Create(eleP).Error
	}

	return nil
}

func Save(eleP interface{}) {
	infrastructure.DB().Save(eleP)
}

func Update(eleP interface{}, updateField map[string]interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return infrastructure.DB().Model(eleP).Update(updateField).Error
	} else {
		return infrastructure.DB().Model(eleP).Where(queryKey, queryValue...).Update(updateField).Error //eleP must as &User{}, no primary key
	}
	return nil
}

func Delete(eleP interface{}, queryKey string, queryValue string) error {
	rows, _ := infrastructure.DB().Model(eleP).Rows()
	if rows.Next() {
		return errors.New("sqlhelper: delete too many rows")
	}

	return infrastructure.DB().Delete(eleP).Error
}

func Select(eleAP interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return infrastructure.DB().Find(eleAP).Error
	} else {
		return infrastructure.DB().Where(queryKey, queryValue...).Find(eleAP).Error
	}
	return nil
}

func SelectRandom(eleAP interface{}, limit int, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return infrastructure.DB().Limit(limit).Set("gorm:query_option", "ORDER BY RAND()").Find(eleAP).Error
	} else {
		return infrastructure.DB().Limit(limit).Set("gorm:query_option", "ORDER BY RAND()").Where(queryKey, queryValue...).Find(eleAP).Error
	}
	return nil
}

func SelectOne(eleP interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return infrastructure.DB().First(eleP).Error
	} else {
		return infrastructure.DB().Where(queryKey, queryValue...).First(eleP).Error
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
