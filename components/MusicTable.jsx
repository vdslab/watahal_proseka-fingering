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

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#acfef4" },
    secondary: { main: "#464366" },
  },
});

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
    backgroundColor: theme.palette.secondary.main,
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

  const rotateStyle = {
    transform: "rotate(180deg)",
  };

  const [TableStatus, setTableStatus] = useState(["", 1]);

  function sorttable(data, value, Status) {
    if (Status == 1) {
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
    } else {
      return [
        ...data.sort((a, b) => {
          if (a[`${value}`] > b[`${value}`]) {
            return -1;
          } else if (a[`${value}`] < b[`${value}`]) {
            return 1;
          } else {
            return 0;
          }
        }),
      ];
    }
  }

  const [showdata, setShowdata] = useState(sorttable(data, "id"));

  useEffect(() => {
    setShowdata(data);
  }, [data]);

  function onclick(event) {
    const value = event.currentTarget.value;

    setShowdata(sorttable(showdata, value, TableStatus[1]));
    setTableStatus([value, TableStatus[1] * -1]);
  }

  const router = useRouter();
  return (
    <TableContainer className="max-h-[65vh]">
      <Table stickyHeader>
        <ThemeProvider theme={theme}>
          <TableHead color="secondary">
            <TableRow>
              <StyledTableCell align="center">
                <div>
                  難易度
                  <IconButton onClick={onclick} value="level">
                    <ArrowDropDownIcon
                      color="primary"
                      fontSize="large"
                      style={
                        TableStatus[0] == "level"
                          ? TableStatus[1] == -1
                            ? rotateStyle
                            : {}
                          : {}
                      }
                    />
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex items-center justify-items-center">
                  <p>曲名</p>
                  <IconButton onClick={onclick} value="name">
                    <ArrowDropDownIcon
                      color="primary"
                      fontSize="large"
                      style={
                        TableStatus[0] == "name"
                          ? TableStatus[1] == -1
                            ? rotateStyle
                            : {}
                          : {}
                      }
                    />
                  </IconButton>
                </div>
              </StyledTableCell>

              <StyledTableCell>
                <div className="flex flex-row items-center justify-items-center">
                  <p className="hidden w-0 sm:w-auto sm:inline basis-3/4 text-center">
                    曲の長さ
                  </p>
                  <IconButton onClick={onclick} value="sec">
                    <ArrowDropDownIcon
                      color="primary"
                      fontSize="large"
                      style={
                        TableStatus[0] == "sec"
                          ? TableStatus[1] == -1
                            ? rotateStyle
                            : {}
                          : {}
                      }
                    />
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex flex-row items-center justify-items-center">
                  <p className="hidden w-0 sm:w-auto sm:inline basis-3/4 text-center">
                    BPM
                  </p>
                  <IconButton onClick={onclick} value="bpm">
                    <ArrowDropDownIcon
                      color="primary"
                      fontSize="large"
                      style={
                        TableStatus[0] == "bpm"
                          ? TableStatus[1] == -1
                            ? rotateStyle
                            : {}
                          : {}
                      }
                    />
                  </IconButton>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
        </ThemeProvider>
        <TableBody>
          {showdata.map(({ id, name, level, sec, bpm, videoid }) => {
            return (
              <TableRow
                key={name}
                hover
                onClick={() => router.push(`/music/${videoid}?id=${id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">{level}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell className="text-center">
                  {Math.floor(sec / 60)}:{("00" + (sec % 60)).slice(-2)}
                </TableCell>
                <TableCell className="text-center">{bpm}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
