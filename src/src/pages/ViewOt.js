import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import history from "../history";
import useTable from "./useTable";
import { Paper, TableBody, Toolbar, InputAdornment } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import { Table, TableHead, TableRow, TableCell } from "@material-ui/core";
import { Button } from "../controls/index";

const electron = eval("require")("electron");
const ipcRenderer = electron.ipcRenderer;

const headCells = [
  { id: "regNumber", label: "Registration No" },
  { id: "time", label: "Time" },
  { id: "date", label: "Date" },
  { id: "patientName", label: "Name" },
  { id: "fatherOrHusbandName", label: "Husband/ Father" },
  { id: "cnic", label: "CNIC" },
  { id: "cellNo", label: "Cell No" },
  { id: "symptomsAndSigns", label: "Symptoms" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "rxPlan", label: "RX Plan" },
  { id: "furtherPlan", label: "Further Plan" },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title_card: {
    fontSize: 34,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  pos: {
    marginTop: 26,
    marginBottom: 1,
    fontSize: 18,
  },
  title_card: {
    fontSize: 34,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    margin: 10,
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      // backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function ViewOt() {
  let [records, setRecords] = useState(undefined);
  // console.log("OLD", records);
  async function requestData() {
    ipcRenderer.send("fetchOt");
    getData();
  }

  async function getData() {
    ipcRenderer.on("sendOt", (event, arg) => {
      // console.log(records);
      // arg is the shit to use
      // console.log("GOT THIS: ");
      setRecords(arg);
      // console.log(Object.keys(arg[0]["_doc"]));

      // console.log(arg);
      // console.log("#############");
      // if (records) {
      //   records.map((i) => console.log(i["_doc"]));
      // }
    });
  }

  // renderer - main - renderer
  // 1

  const { TblContainer, TblHead, TblPagination } = useTable(records, headCells);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            See OT Records
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Main Menu"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/ingoing")}>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Ingoing"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/outgoing")}>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Outgoing"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/ot")}>
            <ListItemIcon>
              <PriorityHighIcon />
            </ListItemIcon>
            <ListItemText primary={"Add OT"} />
          </ListItem>{" "}
        </List>
        <Divider />
        <List>
          <ListItem button button onClick={() => history.push("/ingoingRec")}>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText primary={"See Ingoing Records"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/outgoingRec")}>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary={"See Outgoing Records"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/otRec")}>
            <ListItemIcon>
              <PriorityHighIcon />
            </ListItemIcon>
            <ListItemText primary={"See OT Records"} />
          </ListItem>
        </List>
      </Drawer>
      <main>
        <div className={classes.drawerHeader} />
        <Typography className={classes.title_card} gutterBottom>
          <span role="img" aria-label="hi">
            Click to get all records
          </span>
        </Typography>
        <Button
          text="View Records"
          color="default"
          onClick={() => requestData()}
        />

        {records ? (
          <Table className={classes.table}>
            <Paper className={classes.pageContent}>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((item) => (
                  <TableRow key={item["_doc"].regNumber}>
                    <TableCell>{item["_doc"].regNumber}</TableCell>
                    <TableCell>
                      {item["_doc"].time.split("T")[1].split(".")[0]}
                    </TableCell>
                    <TableCell>{item["_doc"].date.split("T")[0]}</TableCell>
                    <TableCell>{item["_doc"].patientName}</TableCell>
                    <TableCell>{item["_doc"].fatherOrHusbandName}</TableCell>
                    <TableCell>{item["_doc"].cnic}</TableCell>
                    <TableCell>{item["_doc"].cellNo}</TableCell>
                    <TableCell>{item["_doc"].symptomsAndSigns}</TableCell>
                    <TableCell>{item["_doc"].diagnosis}</TableCell>
                    <TableCell>{item["_doc"].rxPlan}</TableCell>
                    <TableCell>{item["_doc"].furtherPlan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Paper>
          </Table>
        ) : null}
      </main>
    </div>
  );
}
