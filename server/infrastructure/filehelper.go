package infrastructure

import (
	"fmt"
	"path/filepath"
)

func getSub() {
	files, _ := filepath.Glob("../web*")
	fmt.Println(files)
}
