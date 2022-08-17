import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ActionAreaCard({ data }) {
  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardActionArea>
        <ImageList
          sx={{ width: "auto", height: "auto" }}
          cols={1}
          rowHeight={164}
        >
          <ImageListItem>
            <div style={{ display: "flex" }}>
              <img
                src={`http://localhost:3000/upload/images/${data.batteries.battery.image.name}`} alt=""
                style={{ width: "100%", height: "100%" }}
              />
              <img
                src={`http://localhost:3000/upload/images/${data.panels.panel.image.name}`} alt=""
                style={{ width: "100%", height: "100%" }}
              />
              <img
                src={`http://localhost:3000/upload/images/${data.inverters.image.name}`} alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </ImageListItem>
        </ImageList>
        <CardContent style={{ background: "#E4D0E4" }}>
          <Typography gutterBottom variant="h5" component="div">
            {data.amperes.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <div>
                  Battery: {data.batteries.battery.name}(
                  {data.batteries.battery.type}){data.batteries.battery.capacity}AMP Quantity:{" "}
                  {data.batteries.bquantity}
                </div>
                <div>
                  Panel: {data.panels.panel.name}({data.panels.panel.type}){data.panels.panel.size}W
                  Quantity: {data.panels.pquantity}
                </div>{" "}
              </div>
              <div>
                inverter: {data.inverters.name}({data.inverters.size}KVA)
              </div>
              <div>price: {data.price}$</div>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
