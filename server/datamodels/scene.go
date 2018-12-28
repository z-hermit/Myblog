package datamodels

type Scene struct {
	ID            int    `json:"-"`
	Scene         string `json:"scene"`
	Alias         string `json:"alias"`
	PackageName   string `json:"packageName"`
	Time          string `json:"time"`
	Memory        string `json:"memory"`
	CpuScore      string `json:"cpuScore"`
	GpuScore      string `json:"gpuScore"`
	ResourceError string `json:"resourceError"`
	RemarkRaw     string `json:"remarkRaw"`
	RemarkHtml    string `json:"remarkHtml"`
}
