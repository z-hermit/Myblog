package infrastructure

import (
	"fmt"
	"github.com/ae0000/sqlhelper"
	CO "github.com/iris-contrib/Iris-Mini-Social-Network/config"
	"time"
)

//sName 是数据库列名, ele 需传地址
func Addstruct(sName string, ele interface{}) {
	sqlhelper.StructFields(sName, ele)
}

//params 按照字典序传入
func Insert(sName string, params ...interface{}) error {
	db := CO.DB()
	fields, paramsTag := sqlhelper.InsertFields(sName)
	sql := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", sName, fields, paramsTag)
	_, err := db.Exec(sql, params)

	return err
}

func Update(sName string, queryKey string, queryValue string, params ...string) error {
	db := CO.DB()
	fields := sqlhelper.UpdateFields(sName)
	sql := fmt.Sprintf("UPDATE %s SET %s WHERE %s = %s", sName, fields, queryKey, queryValue)
	_, err := db.Exec(sql, params)

	return err
}

func Delete(sName string, queryKey string, queryValue string) error {
	db := CO.DB()
	sql := fmt.Sprintf("DELETE FROM %s WHERE %s = %s", sName, queryKey, queryValue)
	_, err := db.Exec(sql)

	return err
}

func Select(sName string, queryKey string, queryValue string) {
	db := CO.DB()
	fields := sqlhelper.UpdateFields(sName)
	sql := fmt.Sprintf("UPDATE %s SET %s WHERE %s = %s", sName, fields, queryKey, queryValue)
	_, err := db.Exec(sql)

	return err
}

// MakeTimestamp function
func MakeTimestamp() int64 {
	return time.Now().UnixNano() / (int64(time.Millisecond) / int64(time.Nanosecond))
}
