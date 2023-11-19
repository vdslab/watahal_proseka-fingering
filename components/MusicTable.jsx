"use client";
import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  IconButton,
  Box,
  Typography,
  Button,
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
    <TableContainer sx={{ maxHeight: "65vh" }}>
      <Table stickyHeader>
        <ThemeProvider theme={theme}>
          <TableHead color="secondary">
            <TableRow>
              <StyledTableCell align="center">
                <Box display={"flex"} alignItems={"center"}>
                  <Button
                    onClick={onclick}
                    value="level"
                    startIcon={
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
                    }
                  >
                    <Typography>Lv</Typography>
                  </Button>
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box className="flex items-center justify-items-center">
                  <Button
                    onClick={onclick}
                    value="name"
                    startIcon={
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
                    }
                  >
                    <Typography>曲名</Typography>
                  </Button>
                </Box>
              </StyledTableCell>

              <StyledTableCell>
                <Box
                  width={"100%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    onClick={onclick}
                    value="sec"
                    startIcon={
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
                    }
                  >
                    <Typography>曲の時間</Typography>
                  </Button>
                  <IconButton onClick={onclick} value="sec"></IconButton>
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    onClick={onclick}
                    value="bpm"
                    startIcon={
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
                    }
                  >
                    <Typography>BPM</Typography>
                  </Button>
                </Box>
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
                <TableCell
                  align="center"
                  width={20}
                  height={20}
                  sx={{
                    padding: 0,
                  }}
                >
                  <Box
                    width={"100%"}
                    height={"100%"}
                    bgcolor={"gray.300"}
                    borderRadius={"40px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    {level}
                  </Box>
                </TableCell>
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
