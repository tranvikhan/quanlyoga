import React, { useEffect, useState } from "react";
import firebase from "firebase";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const columns = [
  {
    dataField: "stt",
    text: "Stt",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "count",
    text: "Số Lỗ Hỏng",
    sort: true,
  },
  {
    dataField: "countFix",
    text: "Số Lỗ Đã Sửa",
    sort: true,
  },

  {
    dataField: "description",
    text: "Mô tả",
    sort: false,
  },
  {
    dataField: "date",
    text: "Ngày cập nhật",
    sort: false,
  },
];

const defaultSorted = [
  {
    dataField: "stt",
    order: "asc",
  },
];

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <React.Fragment>
    <label className="d-inline mr-1">Show</label>
    <Input
      type="select"
      name="select"
      id="no-entries"
      className="custom-select custom-select-sm d-inline col-1"
      defaultValue={currSizePerPage}
      onChange={(e) => onSizePerPageChange(e.target.value)}
    >
      {options.map((option, idx) => {
        return <option key={idx}>{option.text}</option>;
      })}
    </Input>
    <label className="d-inline ml-1">entries</label>
  </React.Fragment>
);

const TableWithSearch = () => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [records, setRecords] = useState([]);
  useEffect(() => {
    var starCountRef = firebase.database().ref("routes");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let values = Object.keys(data);
        let labels = Object.values(data);
        let newArray = [];
        for (let i = 0; i < values.length; i++) {
          let points = Object.values(labels[i].points);
          newArray.push({
            stt: i + 1,
            name: labels[i].name,
            count: points.length,
            countFix: points.filter((i) => i.IsFix).length,
            description: labels[i].description,
            date: new firebase.firestore.Timestamp(
              labels[i].updateAt.seconds,
              labels[i].updateAt.nanoseconds
            )
              .toDate()
              .toDateString(),
          });
        }
        setRecords(newArray);
      } else {
        setRecords([]);
      }
    });
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Danh sách các tuyến đường</CardTitle>
        <CardSubtitle tag="h6" className="mb-3 text-muted">
          Tổng số có 5 tuyến đường được cập nhật
        </CardSubtitle>

        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={records}
          columns={columns}
          search
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
        >
          {(props) => (
            <React.Fragment>
              <Row>
                <Col>
                  <SearchBar {...props.searchProps} />
                </Col>
                <Col className="text-right">
                  <ExportCSVButton
                    {...props.csvProps}
                    className="btn btn-primary"
                  >
                    Export CSV
                  </ExportCSVButton>
                </Col>
              </Row>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                defaultSorted={defaultSorted}
                pagination={paginationFactory({
                  sizePerPage: 5,
                  sizePerPageRenderer: sizePerPageRenderer,
                  sizePerPageList: [
                    { text: "5", value: 5 },
                    { text: "10", value: 10 },
                    { text: "25", value: 25 },
                  ],
                })}
                wrapperClasses="table-responsive"
              />
            </React.Fragment>
          )}
        </ToolkitProvider>
      </CardBody>
    </Card>
  );
};

const MyRoute = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <TableWithSearch />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MyRoute;
