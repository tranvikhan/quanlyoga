import React, { Component } from "react";
import { Row, Col, Card, Button } from "reactstrap";
import Dropzone from "react-dropzone";
import { FaFileExcel, FaFileCsv, FaTimes } from "react-icons/fa";

class FileUploader extends Component {
  static defaultProps = {
    showPreview: true,
  };

  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);

    this.state = {
      selectedFiles: [],
    };
  }

  /**
   * Handled the accepted files and shows the preview
   */
  handleAcceptedFiles = (files) => {
    let demo = [...files];
    if (this.props.onFileUpload) this.props.onFileUpload([...files]);
    var allFiles = [...files];

    if (this.props.showPreview) {
      demo.map((file) => {
        let temp = file["name"].split(".");
        Object.assign(file, {
          preview: temp[temp.length - 1],
          formattedSize: this.formatBytes(file.size),
        });
        return file;
      });

      allFiles = this.state.selectedFiles;
      allFiles.pop();
      allFiles.push(...demo);
      this.setState({ selectedFiles: allFiles });
    }
  };

  /**
   * Formats the size
   */
  formatBytes = (bytes, decimals) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  render() {
    return (
      <React.Fragment>
        <Dropzone
          onDrop={(acceptedFiles) => this.handleAcceptedFiles(acceptedFiles)}
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple={false}
          {...this.props}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone text-center">
              <div className="dz-message py-5 needsclick" {...getRootProps()}>
                <input {...getInputProps()} />
                <i className="h1 text-muted uil-cloud-upload"></i>
                <h5>Kéo file CSV vào đây</h5>
                <span className="text-muted font-13">
                  (Hoặc nhấp vào đây để tải file lên,{" "}
                  <strong>Chỉ chấp nhận upload file csv, xlsx ,xls</strong>)
                </span>
              </div>
            </div>
          )}
        </Dropzone>

        {this.props.showPreview && (
          <div className="dropzone-previews mt-3" id="file-previews">
            {this.state.selectedFiles.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + "-file"}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      {f.preview && (
                        <Col className="col-auto">
                          <div
                            className="rounded-circle border-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: 40,
                              height: 40,
                              backgroundColor: "#f3f2f1",
                            }}
                          >
                            {f.preview === "csv" ? (
                              <FaFileCsv size={20} color="#f39c12" />
                            ) : (
                              <FaFileExcel size={20} color="#f39c12" />
                            )}
                          </div>
                        </Col>
                      )}
                      <Col className="pl-0">
                        <h6 className="font-weight-bold text-dark">{f.name}</h6>
                        <p className="mb-0 text-muted">{f.formattedSize}</p>
                      </Col>
                      <Col className="col-auto">
                        <Button
                          type="button"
                          className="rounded-circle p-0 pb-1 border-0"
                          style={{
                            width: 35,
                            height: 35,
                            backgroundColor: "#f3f2f1",
                          }}
                          onClick={() => {
                            this.props.onFileUpload([]);
                            this.setState({ selectedFiles: [] });
                          }}
                        >
                          <FaTimes size={18} color="#e74c3c" />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default FileUploader;
