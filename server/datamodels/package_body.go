package datamodels

type PackageBody struct {
	Scene       string `json:"scene"`
	Time        string `json:"time"`
	Platform    string `json:"platform"`
	AllFile     string `json:"allFile"`
	Common      string `json:"common"`
	Self        string `json:"self"`
	AllTexture  string `json:"allTexture"`
	AllMesh     string `json:"allMesh"`
	BundleCount string `json:"bundleCount"`
}
