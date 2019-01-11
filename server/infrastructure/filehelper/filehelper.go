package filehelper

import (
	"fmt"
	"os"
	"path/filepath"
)

func getSub() {
	files, _ := filepath.Glob("../web*")
	fmt.Println(files)
}

func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
