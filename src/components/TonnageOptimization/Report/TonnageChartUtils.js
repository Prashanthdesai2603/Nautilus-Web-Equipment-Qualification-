import React from 'react';
import ReactDOM from "react-dom/client";
import Plot from "react-plotly.js";

/**
 * Captures a Plotly chart as a base64 image string.
 * @param {Array} data - Plotly data array
 * @param {Object} layout - Plotly layout object
 * @returns {Promise<string>} Base64 PNG image string
 */
export async function captureTonnageChart({ data, layout }) {
    return new Promise((resolve) => {
        try {
            // Create a hidden container
            const tempDiv = document.createElement("div");
            tempDiv.style.cssText = `
                position: absolute;
                left: -9999px;
                top: -9999px;
                width: 800px;
                height: 600px;
                background: white;
                z-index: -1;
            `;
            document.body.appendChild(tempDiv);

            const root = ReactDOM.createRoot(tempDiv);

            // Render the chart
            root.render(
                <Plot
                    data={data}
                    layout={layout}
                    config={{
                        displayModeBar: false,
                        staticPlot: true
                    }}
                    useResizeHandler={false}
                    style={{ width: "100%", height: "100%" }}
                />
            );

            // Wait for Plotly to render and capture
            let attempts = 0;
            const maxAttempts = 50;
            const checkInterval = setInterval(async () => {
                attempts++;
                try {
                    const plotlyDiv = tempDiv.querySelector('.js-plotly-plot');

                    // If element exists and has initialized
                    if (plotlyDiv && plotlyDiv._fullLayout) {
                        clearInterval(checkInterval);

                        try {
                            // Use Plotly's toImage
                            const dataUrl = await window.Plotly.toImage(plotlyDiv, {
                                format: 'png',
                                width: 800,
                                height: 600,
                                scale: 2 // Higher resolution
                            });

                            // Cleanup
                            root.unmount();
                            tempDiv.remove();
                            resolve(dataUrl);

                        } catch (imgError) {
                            console.error("Plotly toImage error:", imgError);
                            root.unmount();
                            tempDiv.remove();
                            resolve("");
                        }
                    } else if (attempts >= maxAttempts) {
                        // Timeout
                        clearInterval(checkInterval);
                        root.unmount();
                        tempDiv.remove();
                        console.warn("Chart capture timed out");
                        resolve("");
                    }
                } catch (err) {
                    console.error("Error checking chart:", err);
                    if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                        root.unmount();
                        tempDiv.remove();
                        resolve("");
                    }
                }
            }, 100);

        } catch (error) {
            console.error("captureTonnageChart Fatal Error:", error);
            resolve("");
        }
    });
}
