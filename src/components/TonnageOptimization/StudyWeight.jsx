import React, { useState, useMemo, useRef } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Tooltip
} from "@syncfusion/ej2-react-charts";

/* ---------- CONSTANTS ---------- */

const EMPTY_ROW = {
  tonnage: "",
  s1: "",
  s2: "",
  s3: "",
  avg: "",
  inc: "",
  perc: ""
};

const FIELDS = ["tonnage", "s1", "s2", "s3"];

/* ---------- COMPONENT ---------- */

const StudyWeight = ({ sessionId }) => {
  const storageKey = sessionId
    ? `studyWeightData_${sessionId}`
    : "studyWeightData";

  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved
      ? JSON.parse(saved)
      : Array.from({ length: 10 }, () => ({ ...EMPTY_ROW }));
  });

  const [showChart, setShowChart] = useState(false);
  const chartRef = useRef(null);

  /* ---------- CHANGE HANDLER ---------- */

  const handleChange = (rowIndex, field, value) => {
    const updated = [...rows];
    updated[rowIndex][field] = value;

    recalcRow(updated, rowIndex);
    setRows(updated);
  };

  /* ---------- MULTI-CELL PASTE HANDLER ---------- */

  const handlePaste = (e, startRow, startCol) => {
    e.preventDefault();

    const clipboard = e.clipboardData.getData("text");
    const lines = clipboard.trim().split("\n");

    const updated = [...rows];

    lines.forEach((line, rowOffset) => {
      const values = line.split("\t");
      const rowIndex = startRow + rowOffset;

      if (!updated[rowIndex]) return;

      values.forEach((val, colOffset) => {
        const field = FIELDS[startCol + colOffset];
        if (field) {
          updated[rowIndex][field] = val.trim();
        }
      });

      recalcRow(updated, rowIndex);
    });

    setRows(updated);
  };

  /* ---------- CALCULATION ---------- */

  const recalcRow = (data, index) => {
    const s1 = parseFloat(data[index].s1) || 0;
    const s2 = parseFloat(data[index].s2) || 0;
    const s3 = parseFloat(data[index].s3) || 0;

    if (s1 || s2 || s3) {
      const avg = ((s1 + s2 + s3) / 3).toFixed(2);
      data[index].avg = avg;

      if (index > 0 && data[index - 1].avg) {
        const prev = parseFloat(data[index - 1].avg);
        const inc = avg - prev;
        data[index].inc = inc.toFixed(2);
        data[index].perc = ((inc / prev) * 100).toFixed(2);
      } else {
        data[index].inc = "";
        data[index].perc = "";
      }
    }
  };

  /* ---------- CHART DATA ---------- */

  const chartData = useMemo(() => {
    return rows
      .filter(r => r.tonnage && r.avg)
      .map(r => ({
        tonnage: Number(r.tonnage),
        avgWeight: Number(r.avg)
      }))
      .sort((a, b) => b.tonnage - a.tonnage);
  }, [rows]);

  /* ---------- BUTTON ACTIONS ---------- */

  const handleCalculate = () => setShowChart(true);

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(rows));
    alert("Study Weight data saved successfully");
  };

  const handleClose = () => setShowChart(false);

  const handlePrint = () => window.print();

  /* ---------- UI ---------- */

  return (
    <div className="study-container">
      {/* TABLE */}
      <div className="study-table">
        <table>
          <thead>
            <tr>
              <th>Tonnage</th>
              <th>Sample 1</th>
              <th>Sample 2</th>
              <th>Sample 3</th>
              <th className="gray">Average Weight</th>
              <th className="gray">Actual Increase</th>
              <th className="gray">% Increase</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {FIELDS.map((field, colIndex) => (
                  <td key={field}>
                    <input
                      value={row[field]}
                      onChange={e =>
                        handleChange(rowIndex, field, e.target.value)
                      }
                      onPaste={e =>
                        handlePaste(e, rowIndex, colIndex)
                      }
                    />
                  </td>
                ))}
                <td className="gray">{row.avg}</td>
                <td className="gray">{row.inc}</td>
                <td className="gray">{row.perc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHART */}
      <div className="study-chart">
        <div className="chart-title">
          <span>Tonnage Study Weight Chart</span>
          <button onClick={handlePrint}>Print</button>
        </div>

        <div className="chart-box">
          {showChart && chartData.length > 0 && (
            <ChartComponent
              ref={chartRef}
              primaryXAxis={{ title: "Tonnage", valueType: "Category" }}
              primaryYAxis={{ title: "Average Weight" }}
              tooltip={{ enable: true }}
              height="100%"
            >
              <Inject services={[LineSeries, Category, Tooltip]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={chartData}
                  xName="tonnage"
                  yName="avgWeight"
                  type="Line"
                  marker={{ visible: true }}
                  width={2}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="study-footer">
        <button onClick={handleCalculate}>
          Calculate & Show Graph
        </button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default StudyWeight;
