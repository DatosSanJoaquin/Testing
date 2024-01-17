import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

function App() {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
      hidden: true,
    },
    {
      dataField: "Areas",
      text: "ÁREAS",
      headerClasses: "headerTabla",
      classes: "agrupacion",
      headerStyle: {
        width: "250px",
        minWidth: "250px",
        color: "#fff",
      },
      formatter: (cell, row) => {
        return (
          <Row>
            <Col md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#5d428b",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>{row.Areas}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#5d428b",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></div>
                  <span className="iniciativas">9 Iniciativas</span>
                </div>
              </div>
            </Col>
            <Col md={6} style={{ paddingTop: "15px", paddingBottom: "15px" }}>
              <div style={{ paddingTop: "10px" }}>
                <ProgressBar variant="warning" now={row.barra} />
              </div>
            </Col>
            <Col
              md={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: "0px",
              }}
            >
              {row.Avance}
            </Col>
          </Row>
        );
      },
    },
    // {
    //   dataField: "barra",
    //   text: "",

    //   headerClasses: "headerTabla",
    //   classes: "agrupacion",
    //   formatter: priceFormatter,
    // },

    // {
    //   dataField: "Avance",
    //   text: "AVANCE DEL ÁREA",
    //   align: "center",
    //   headerStyle: {
    //     width: "180px",
    //     minWidth: "180px",
    //   },
    //   headerClasses: "headerTabla",
    //   classes: "agrupacion",
    // },
  ];

  //Consulta

  const data = [
    {
      id: 1,
      Areas: "Área 1",
      barra: 30,
      Avance: "30%",
    },
    {
      id: 2,
      Areas: "Área 2",
      barra: 10,
      Avance: "10%",
    },
    {
      id: 3,
      Areas: "Área 3",
      barra: 20,
      Avance: "20%",
    },
    {
      id: 4,
      Areas: "Área 4",
      barra: 48.2,
      Avance: "48.2%",
    },
    {
      id: 5,
      Areas: "Área 5",
      barra: 34.2,
      Avance: "34.2%",
    },
  ];

  const percentage = 66;

  const [progress, setProgress] = useState(0);
  const [porcentajeTotal, setPorcentajeTotal] = useState(0);

  useEffect(() => {
    Papa.parse("/Presupuestos.csv", {
      download: true,
      header: true, // asumiendo que tu CSV tiene encabezados de columna
      complete: function (results) {
        console.log("Finished:", results.data);
        console.log(JSON.stringify(results.data, null, 2)); // Convertir a JSON y formatear

        Construir(results.data);
      },
    });

    PorcentajeTotal();
  }, []);

  const Construir = (data) => {
    console.log("Construir");
    console.log(data);

    const resultado = {};

    data.forEach((item) => {
      // Si el área no está definida o está vacía, se ignora el elemento
      if (!item.Area || item.Area === "") return;

      // Si el área no existe en el resultado, se inicializa
      if (!resultado[item.Area]) {
        resultado[item.Area] = {};
      }

      // Si la iniciativa no existe en el área, se inicializa
      if (!resultado[item.Area][item.Iniciativa]) {
        resultado[item.Area][item.Iniciativa] = [];
      }

      // Se añade el hito a la iniciativa correspondiente
      resultado[item.Area][item.Iniciativa].push(item.Hito);
    });

    console.log("aaray", Object.values(resultado));

    let array = Object.values(resultado);

    const nombres = array.map((objeto) => {
      // 'Object.keys(objeto)[0]' obtendrá la clave del primer par clave-valor del objeto,
      // que parece ser lo que está marcado en rojo en la consola
      let nombreArea = Object.keys(objeto)[0];

      console.log("nombreArea", nombreArea);
      console.log("objeto", objeto);
    });

    //console.log(nombres);

    //setData(Object.values(resultado));
    //console.log(resultado);
  };

  const PorcentajeTotal = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 66 ? 66 : prevProgress + 1
      );
    }, 50); // Ajusta el tiempo según necesites

    return () => clearInterval(interval);
  };

  const expandRow = {
    renderer: (row) => (
      <>
        <Row
          style={{
            paddingTop: "20px",
            paddingBottom: "15px",
            paddingLeft: "10px",
            border: "1px solid #E0E0E0",
            margin: "0px",
          }}
        >
          <Col md={10}>
            <h5
              style={{
                color: "inherit",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: "500",
              }}
            >
              Fondo Soberano de Adaptación al Cambio Climático {row.id}
            </h5>
            <p
              style={{ color: "inherit", fontFamily: "'Work Sans',sans-serif" }}
            >
              Crear, con fondos existentes y parte de la recaudación del
              royalty, un Fondo Soberano de Adaptación al Cambio Climático
            </p>
          </Col>
          <Col md={2} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ fontSize: "3rem", fontWeight: "700" }}>10%</div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "20px",
            paddingBottom: "15px",
            paddingLeft: "10px",
            border: "1px solid #E0E0E0",
            margin: "0px",
          }}
        >
          <Col md={10}>
            <h5
              style={{
                color: "inherit",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: "500",
              }}
            >
              Obligación de declarar proyecciones de GEI y medidas de mitigación{" "}
              {row.id}
            </h5>
            <p
              style={{ color: "inherit", fontFamily: "'Work Sans',sans-serif" }}
            >
              Propondremos legislación para que aquellos proyectos productivos
              que deban someterse a un proceso de evaluación ambiental declaren
              sus proyecciones de GEI y medidas de mitigación consistentes con
              el objetivo de carbononeutralidad, y para que la exigencia de que
              en proyecciones de línea de base se considere el comportamiento
              futuro de componentes ambientales según diferentes escenarios
              climáticos.
            </p>
          </Col>
          <Col md={2} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ fontSize: "3rem", fontWeight: "700" }}>10%</div>
          </Col>
        </Row>
      </>
    ),
  };

  function priceFormatter(cell, row) {
    console.log("row", row);

    return (
      <div style={{ paddingTop: "10px" }}>
        <ProgressBar variant="warning" now={row.barra} />
      </div>
    );
  }

  return (
    <Container fluid style={{ backgroundColor: "#fff" }}>
      <Row style={{ marginTop: "20px" }}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              strokeWidth={12}
              styles={buildStyles({
                pathColor: `rgba(93, 66, 139, ${progress / 100})`,
                textColor: "rgb(238,112,17)",
                //trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
                textSize: "30px",
                textWeight: "bold",
                // Ajusta el grosor de la barra aquí
                text: {
                  fontWeight: "bold", // Usa 'bold', 'normal', '600', '700', etc.
                },
                // Transición suave del progreso
                pathTransition:
                  progress === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",
              })}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "14px" }}>CUMPLIMIENTO TOTAL</span>
          </div>
        </Col>
      </Row>
      <Row
        className="headerTabla"
        style={{
          marginTop: "10px",
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
          marginLeft: "0px",
          marginRight: "0px",
        }}
      >
        <Col md={4}>AREAS</Col>
        <Col md={6}></Col>
        <Col md={2}>PORCENTAJE</Col>
      </Row>
      <Row style={{ marginTop: "7px" }}>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          expandRow={expandRow}
          bordered={false}
          headerClasses="custom-table-header"
        />
      </Row>
    </Container>
  );
}

export default App;
