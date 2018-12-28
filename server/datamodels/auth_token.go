package datamodels

type AuthToken struct {
	Permission      []string `json:"permission"`
	GlobalSessionID string   `json:"global_session_id"`
}
