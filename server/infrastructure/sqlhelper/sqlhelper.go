package sqlhelper

import (
	"github.com/kataras/iris/core/errors"
	"mywork.com/Myblog/server/infrastructure"
	"time"
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

func Select(eleP interface{}, queryKey string, queryValue ...interface{}) error {
	if queryKey == "" {
		return infrastructure.DB().Find(eleP).Error
	} else {
		return infrastructure.DB().Where(queryKey, queryValue...).Find(eleP).Error
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

// MakeTimestamp function
func MakeTimestamp() int64 {
	return time.Now().UnixNano() / (int64(time.Millisecond) / int64(time.Nanosecond))
}
