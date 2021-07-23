import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

export default function useTable(records, headCells) {
  const TblContainer = (props) => <Table>{props.children}</Table>;

  return TblContainer;
}
