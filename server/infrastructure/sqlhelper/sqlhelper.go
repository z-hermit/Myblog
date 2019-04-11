package sqlhelper

import (
	"database/sql"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/kataras/iris/core/errors"
	"github.com/spf13/viper"
	"mywork.com/mother_packer/config"
	"mywork.com/mother_packer/infrastructure/datamodels"
	"mywork.com/mother_packer/infrastructure/loghelper"
)

var dbarg string

func Myinit() {
	dbarg = config.SqlConfig()

	MigrateTable(datamodels.PackageRecord{})
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
	//result := GormBD().Set("gorm:insert_option", "ON CONFLICT REPLACE").Create(eleP)
	//return result.Value, result.Error
	return nil, errors.New("Insert operation fail, primary key already exist")
}

func Save(eleP interface{}) {
	GormBD().Save(eleP)
}

//db.Model(&user).Update("name", "hello")
func Updates(eleP interface{}, updateField map[string]interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return GormBD().Model(eleP).Updates(updateField).Error
	} else {
		return GormBD().Model(eleP).Where(queryKey, queryValue...).Updates(updateField).Error //eleP must as &User{}, no primary key
	}
	return nil
}

//db.Model(&user).Update("name", "hello")
func Update(eleP interface{}, updateKey string, updateValue interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return GormBD().Model(eleP).Update(updateKey, updateValue).Error
	} else {
		return GormBD().Model(eleP).Where(queryKey, queryValue...).Update(updateKey, updateValue).Error //eleP must as &User{}, no primary key
	}
	return nil
}

func Delete(eleP interface{}) error {
	//rows, _ := GormBD().Model(eleP).Rows()
	//if rows.Next() {
	//	return errors.New("sqlhelper: delete too many rows")
	//}

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
	}
	return GormBD().Where(queryKey, queryValue...).First(eleP).Error
}

var sqldb *sql.DB = nil

func DB() *sql.DB {
	if sqldb == nil {
		mysqlconfig := viper.GetStringMap("mysql")
		user := mysqlconfig["user"].(string)
		password := mysqlconfig["pass"].(string)
		host := mysqlconfig["host"].(string)
		_db := mysqlconfig["dbname"].(string)

		sqldb, err := sql.Open("mysql", user+":"+password+"@tcp("+host+":3306)/"+_db)
		if err != nil {
			fmt.Println(err)
		}
		return sqldb
	}
	return sqldb
}

func GormBD() *gorm.DB {

	db, err := gorm.Open("mysql", dbarg)
	//db.LogMode(true)
	if err != nil {
		loghelper.GlobalLog.Println("GormBD:", err)
	}
	return db
}
