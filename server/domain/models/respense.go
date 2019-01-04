package models

const (
	SUCCESS = 200
	FAIL    = 500
	NO_AUTH = 600
)

type JsonResponse struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}
