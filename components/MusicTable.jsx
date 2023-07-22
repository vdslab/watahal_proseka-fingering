"use client";
import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { useRouter } from "next/navigation";

import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e1bee7",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function MusicTable({ data }) {
  const cell = "px-4 py-2";
  const smallCell = `${cell} w-1/12`;
  const dataCell = `border ${cell}`;
  const smallDataCell = `border ${smallCell} text-center`;

  function sorttable(data, value) {
    return [
      ...data.sort((a, b) => {
        if (a[`${value}`] < b[`${value}`]) {
          return -1;
        } else if (a[`${value}`] > b[`${value}`]) {
          return 1;
        } else {
          return 0;
        }
      }),
    ];
  }
  const [showdata, setShowdata] = useState(sorttable(data, "id"));

  useEffect(() => {
    setShowdata(data);
  }, [data]);

  function onclick(event) {
    const value = event.currentTarget.value;
    setShowdata(sorttable(showdata, value));
  }

  const router = useRouter();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              曲名
              <IconButton onClick={onclick} value="name">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              難易度
              <IconButton onClick={onclick} value="level">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              曲の長さ
              <IconButton onClick={onclick} value="sec">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              BPM
              <IconButton onClick={onclick} value="bpm">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata.map(({ name, level, sec, bpm, videoid }) => {
            return (
              <TableRow
                key={name}
                hover
                onClick={() => router.push(`/music/${videoid}`)}
              >
                <TableCell>{name}</TableCell>
                <TableCell>{level}</TableCell>
                <TableCell>{sec}</TableCell>
                <TableCell>{bpm}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
