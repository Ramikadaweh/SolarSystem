import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3000/upload/images/${data.image.name}`}
          alt="green iguana"
        />
        <CardContent style={{background:"#E4D0E4"}}>
          <Typography gutterBottom variant="h5" component="div">
            {data.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "20px",
              }}
            >
              <div>
                size:
                {data.size}KVA
              </div>{" "}
              <div>
                price:
                {data.price}$
              </div>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
