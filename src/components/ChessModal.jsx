import { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import { motion, AnimatePresence } from "framer-motion";
import { TbX, TbRefresh, TbArrowBackUp, TbTrophy, TbRobot } from "react-icons/tb";
import { FaChess } from "react-icons/fa6";

const PIECE_VALUES = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 1000,
};

const CHESS_PIECES = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};

const BOT_DIALOGUES = {
  start: "Click any White piece to select it, then click a target square to move!",
  normal: [
    "Analyzing board position...",
    "Strategic move by White...",
    "Controlling key central squares...",
    "Interesting tactic, counter-attacking...",
    "Developing tactical line...",
  ],
  userCapture: "Solid trade! You captured my piece.",
  botCapture: "Tactical capture made by Jatin AI.",
  checkUser: "Check! Watch your king.",
  checkBot: "Check on my king! Counter-evaluating...",
  winBot: "Checkmate! Jatin AI victory. GG! ♟️",
  winUser: "Checkmate! Outstanding play! You won! 🏆",
  draw: "Stalemate / Draw! Well played 🤝",
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

const INITIAL_PIECES = [
  // Black pieces (Ranks 8 & 7)
  { id: "b_r_a", color: "b", type: "r", square: "a8" },
  { id: "b_n_b", color: "b", type: "n", square: "b8" },
  { id: "b_b_c", color: "b", type: "b", square: "c8" },
  { id: "b_q",   color: "b", type: "q", square: "d8" },
  { id: "b_k",   color: "b", type: "k", square: "e8" },
  { id: "b_b_f", color: "b", type: "b", square: "f8" },
  { id: "b_n_g", color: "b", type: "n", square: "g8" },
  { id: "b_r_h", color: "b", type: "r", square: "h8" },
  { id: "b_p_a", color: "b", type: "p", square: "a7" },
  { id: "b_p_b", color: "b", type: "p", square: "b7" },
  { id: "b_p_c", color: "b", type: "p", square: "c7" },
  { id: "b_p_d", color: "b", type: "p", square: "d7" },
  { id: "b_p_e", color: "b", type: "p", square: "e7" },
  { id: "b_p_f", color: "b", type: "p", square: "f7" },
  { id: "b_p_g", color: "b", type: "p", square: "g7" },
  { id: "b_p_h", color: "b", type: "p", square: "h7" },

  // White pieces (Ranks 2 & 1)
  { id: "w_p_a", color: "w", type: "p", square: "a2" },
  { id: "w_p_b", color: "w", type: "p", square: "b2" },
  { id: "w_p_c", color: "w", type: "p", square: "c2" },
  { id: "w_p_d", color: "w", type: "p", square: "d2" },
  { id: "w_p_e", color: "w", type: "p", square: "e2" },
  { id: "w_p_f", color: "w", type: "p", square: "f2" },
  { id: "w_p_g", color: "w", type: "p", square: "g2" },
  { id: "w_p_h", color: "w", type: "p", square: "h2" },
  { id: "w_r_a", color: "w", type: "r", square: "a1" },
  { id: "w_n_b", color: "w", type: "n", square: "b1" },
  { id: "w_b_c", color: "w", type: "b", square: "c1" },
  { id: "w_q",   color: "w", type: "q", square: "d1" },
  { id: "w_k",   color: "w", type: "k", square: "e1" },
  { id: "w_b_f", color: "w", type: "b", square: "f1" },
  { id: "w_n_g", color: "w", type: "n", square: "g1" },
  { id: "w_r_h", color: "w", type: "r", square: "h1" },
];

export default function ChessModal({ isOpen, onClose }) {
  const [game, setGame] = useState(() => new Chess());
  const [pieces, setPieces] = useState(INITIAL_PIECES);
  const [gameHistory, setGameHistory] = useState([]);
  const [botDialogue, setBotDialogue] = useState(BOT_DIALOGUES.start);
  const [isThinking, setIsThinking] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [gameStatus, setGameStatus] = useState("in_progress");
  const [capturedByBot, setCapturedByBot] = useState([]);
  const [capturedByUser, setCapturedByUser] = useState([]);

  // Selection state
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoveSquares, setValidMoveSquares] = useState([]);

  // Reset Game
  const resetGame = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    setPieces(INITIAL_PIECES.map((p) => ({ ...p })));
    setGameHistory([]);
    setBotDialogue(BOT_DIALOGUES.start);
    setGameStatus("in_progress");
    setIsThinking(false);
    setCapturedByBot([]);
    setCapturedByUser([]);
    setSelectedSquare(null);
    setValidMoveSquares([]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  // Board evaluation for Bot (Black)
  const evaluateBoard = (chessObj) => {
    let total = 0;
    const board = chessObj.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p) {
          const val = PIECE_VALUES[p.type] || 0;
          if (p.color === "b") total += val;
          else total -= val;
        }
      }
    }
    return total;
  };

  // Synchronize pieces state with move result
  const syncPiecesOnMove = (moveResult) => {
    setPieces((prevPieces) => {
      let updated = prevPieces.filter((p) => p.square !== moveResult.to);

      updated = updated.map((p) => {
        if (p.square === moveResult.from) {
          return {
            ...p,
            square: moveResult.to,
            type: moveResult.promotion ? moveResult.promotion : p.type,
          };
        }
        return p;
      });

      return updated;
    });
  };

  // Bot Turn Logic with Realistic Counter-Attack Delay
  const triggerBotMove = useCallback((currentGame, diff) => {
    if (currentGame.isGameOver()) {
      setIsThinking(false);
      return;
    }

    const possibleMoves = currentGame.moves({ verbose: true });
    if (possibleMoves.length === 0) {
      setIsThinking(false);
      return;
    }

    let chosenMove = possibleMoves[0];

    if (diff === "easy") {
      chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    } else {
      let bestVal = -Infinity;
      const shuffled = [...possibleMoves].sort(() => Math.random() - 0.5);

      for (const m of shuffled) {
        currentGame.move(m);
        let val = evaluateBoard(currentGame);
        if (currentGame.isCheckmate()) val += 10000;
        if (currentGame.inCheck()) val += 25;
        currentGame.undo();

        if (val > bestVal) {
          bestVal = val;
          chosenMove = m;
        }
      }
    }

    const moveResult = currentGame.move(chosenMove);
    syncPiecesOnMove(moveResult);
    setGameHistory(currentGame.history());

    if (moveResult && moveResult.captured) {
      setCapturedByBot((prev) => [...prev, moveResult.captured.toUpperCase()]);
      setBotDialogue(BOT_DIALOGUES.botCapture);
    } else if (currentGame.isCheckmate()) {
      setGameStatus("win_bot");
      setBotDialogue(BOT_DIALOGUES.winBot);
    } else if (currentGame.inCheck()) {
      setBotDialogue(BOT_DIALOGUES.checkUser);
    } else {
      const randMsg =
        BOT_DIALOGUES.normal[Math.floor(Math.random() * BOT_DIALOGUES.normal.length)];
      setBotDialogue(randMsg);
    }

    setIsThinking(false);
  }, []);

  // Handle Square Click
  const handleSquareClick = (squareName) => {
    if (gameStatus !== "in_progress" || isThinking || game.turn() !== "w") return;

    if (!selectedSquare) {
      const piece = game.get(squareName);
      if (piece && piece.color === "w") {
        const moves = game.moves({ verbose: true }).filter((m) => m.from === squareName);
        if (moves.length > 0) {
          setSelectedSquare(squareName);
          setValidMoveSquares(moves.map((m) => m.to));
        }
      }
      return;
    }

    if (selectedSquare === squareName) {
      setSelectedSquare(null);
      setValidMoveSquares([]);
      return;
    }

    const clickedPiece = game.get(squareName);
    if (clickedPiece && clickedPiece.color === "w") {
      const moves = game.moves({ verbose: true }).filter((m) => m.from === squareName);
      if (moves.length > 0) {
        setSelectedSquare(squareName);
        setValidMoveSquares(moves.map((m) => m.to));
      } else {
        setSelectedSquare(null);
        setValidMoveSquares([]);
      }
      return;
    }

    if (validMoveSquares.includes(squareName)) {
      try {
        const moveResult = game.move({
          from: selectedSquare,
          to: squareName,
          promotion: "q",
        });

        if (moveResult) {
          syncPiecesOnMove(moveResult);
          setGameHistory(game.history());
          setSelectedSquare(null);
          setValidMoveSquares([]);

          if (moveResult.captured) {
            setCapturedByUser((prev) => [...prev, moveResult.captured.toUpperCase()]);
            setBotDialogue(BOT_DIALOGUES.userCapture);
          } else if (game.inCheck()) {
            setBotDialogue(BOT_DIALOGUES.checkBot);
          } else {
            setBotDialogue("Good move! Jatin AI is calculating counter-attack...");
          }

          if (game.isCheckmate()) {
            setGameStatus("win_user");
            setBotDialogue(BOT_DIALOGUES.winUser);
            return;
          }

          if (game.isDraw()) {
            setGameStatus("draw");
            setBotDialogue(BOT_DIALOGUES.draw);
            return;
          }

          setIsThinking(true);
          setTimeout(() => {
            triggerBotMove(game, difficulty);
          }, 650);

          return;
        }
      } catch {
        // Fallback clear
      }
    }

    setSelectedSquare(null);
    setValidMoveSquares([]);
  };

  // Undo Move
  const undoMove = () => {
    if (isThinking || gameHistory.length < 2) return;
    game.undo();
    game.undo();
    
    const currentBoard = game.board();
    const rebuilt = [];
    currentBoard.forEach((row, r) => {
      row.forEach((p, c) => {
        if (p) {
          rebuilt.push({
            id: `${p.color}_${p.type}_${r}_${c}`,
            color: p.color,
            type: p.type,
            square: `${FILES[c]}${RANKS[r]}`,
          });
        }
      });
    });

    setPieces(rebuilt);
    setGameHistory(game.history());
    setGameStatus("in_progress");
    setSelectedSquare(null);
    setValidMoveSquares([]);
    setBotDialogue("Move undone. Select a White piece to play!");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="chess-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-black/20 overflow-hidden text-black max-h-[95vh] flex flex-col font-sora"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-black/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-black text-white rounded-lg shadow-sm">
                <FaChess size={18} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-medium tracking-tight text-black leading-none">Play Chess with Jatin</h2>
                <p className="text-[11px] text-zinc-500 font-light mt-0.5">Click a White piece & target square to play</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors text-black"
              aria-label="Close Chess Game"
            >
              <TbX size={20} />
            </button>
          </div>

          {/* Single-Screen Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 items-stretch overflow-hidden flex-1">
            {/* Left Column: Board & Player Info */}
            <div className="lg:col-span-7 flex flex-col items-center justify-between h-full">
              {/* Bot Player Bar */}
              <div className="w-full flex items-center justify-between p-2 px-3 mb-1.5 rounded-xl bg-zinc-900 text-white border border-black text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center text-xs font-medium">
                    <TbRobot size={16} />
                  </div>
                  <div>
                    <span className="font-medium block leading-none text-white">Jatin AI Bot</span>
                    <span className="text-[10px] text-zinc-400">Black</span>
                  </div>
                </div>
                {capturedByBot.length > 0 && (
                  <div className="flex gap-1 text-[11px] font-mono bg-white text-black px-1.5 py-0.5 rounded border border-zinc-300">
                    {capturedByBot.join(" ")}
                  </div>
                )}
              </div>

              {/* Animated Sliding Chessboard Container */}
              <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-square rounded-xl overflow-hidden shadow-xl border-2 border-black bg-zinc-900 select-none my-auto shrink-0">
                {/* 8x8 Grid Tiles */}
                <div className="w-full h-full grid grid-cols-8 grid-rows-8">
                  {RANKS.map((rank, rankIdx) =>
                    FILES.map((file, fileIdx) => {
                      const squareName = `${file}${rank}`;
                      const isDark = (rankIdx + fileIdx) % 2 === 1;
                      const isSelected = selectedSquare === squareName;
                      const isValidMove = validMoveSquares.includes(squareName);
                      const pieceOnSquare = pieces.find((p) => p.square === squareName);

                      return (
                        <button
                          key={squareName}
                          onClick={() => handleSquareClick(squareName)}
                          disabled={gameStatus !== "in_progress" || isThinking || game.turn() !== "w"}
                          className={`relative w-full h-full transition-colors focus:outline-none ${
                            isDark ? "bg-[#27272a]" : "bg-[#f4f4f5]"
                          } ${isSelected ? "ring-4 ring-black ring-inset bg-zinc-400/40" : ""}`}
                          aria-label={`Square ${squareName}`}
                        >
                          {/* Valid Move Overlay Dots & Capture Rings */}
                          {isValidMove && (
                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                              {pieceOnSquare ? (
                                <span className="w-full h-full border-4 border-red-600 rounded-md animate-pulse bg-red-500/20" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full bg-black/80 ring-2 ring-white" />
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Animated Sliding Pieces Layer */}
                {pieces.map((p) => {
                  const fileIdx = FILES.indexOf(p.square[0]);
                  const rankIdx = RANKS.indexOf(parseInt(p.square[1], 10));
                  const isSelected = selectedSquare === p.square;

                  return (
                    <motion.div
                      key={p.id}
                      initial={false}
                      animate={{
                        left: `${fileIdx * 12.5}%`,
                        top: `${rankIdx * 12.5}%`,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute w-[12.5%] h-[12.5%] flex items-center justify-center pointer-events-none z-10"
                    >
                      <span
                        className={`text-2xl sm:text-3xl leading-none transition-transform ${
                          p.color === "w"
                            ? "text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]"
                            : "text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
                        } ${isSelected ? "scale-125" : ""}`}
                      >
                        {CHESS_PIECES[p.color][p.type]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* User Player Bar */}
              <div className="w-full flex items-center justify-between p-2 px-3 mt-1.5 rounded-xl bg-zinc-100 text-black border border-zinc-300 text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    YOU
                  </div>
                  <div>
                    <span className="font-medium block leading-none text-black">You (White)</span>
                    <span className="text-[10px] text-zinc-500">
                      {selectedSquare
                        ? `Selected: ${selectedSquare.toUpperCase()} — Click target block to move`
                        : "Click any White piece to play"}
                    </span>
                  </div>
                </div>
                {capturedByUser.length > 0 && (
                  <div className="flex gap-1 text-[11px] font-mono bg-black text-white px-1.5 py-0.5 rounded">
                    {capturedByUser.join(" ")}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: AI Chat & Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3">
              {/* Bot Chat Box */}
              <div className="p-3 rounded-xl bg-black text-white space-y-1.5 relative border border-black shrink-0">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  JATIN BOT LIVE CHAT
                </div>
                <p className="text-xs leading-relaxed font-light min-h-[36px] italic text-zinc-200">
                  "{botDialogue}"
                </p>
                {isThinking && (
                  <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 pt-0.5">
                    <TbRefresh className="animate-spin" size={13} /> Jatin AI is calculating counter-attack...
                  </div>
                )}
              </div>

              {/* Game Result Banner */}
              {gameStatus !== "in_progress" && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-3 rounded-xl text-center border ${
                    gameStatus === "win_user"
                      ? "bg-black text-white border-black"
                      : gameStatus === "win_bot"
                      ? "bg-zinc-900 text-white border-zinc-700"
                      : "bg-zinc-100 text-black border-zinc-300"
                  }`}
                >
                  <TbTrophy size={22} className="mx-auto mb-0.5" />
                  <h4 className="font-medium text-sm">
                    {gameStatus === "win_user"
                      ? "You Won!"
                      : gameStatus === "win_bot"
                      ? "Jatin AI Won!"
                      : "Game Drawn!"}
                  </h4>
                </motion.div>
              )}

              {/* Difficulty Controls */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                        difficulty === level
                          ? "bg-black text-white border-black"
                          : "bg-zinc-100 text-black/70 border-zinc-200 hover:bg-zinc-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={undoMove}
                  disabled={isThinking || gameHistory.length < 2}
                  className="flex-1 py-2 px-3 rounded-xl border-2 border-black text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-black hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <TbArrowBackUp size={16} /> Undo
                </button>

                <button
                  onClick={resetGame}
                  className="flex-1 py-2 px-3 rounded-xl bg-black text-white border-2 border-black text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-all shadow-sm"
                >
                  <TbRefresh size={16} /> Reset
                </button>
              </div>

              {/* History Log */}
              {gameHistory.length > 0 && (
                <div className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-[11px] space-y-0.5 max-h-20 overflow-y-auto">
                  <span className="text-[9px] uppercase font-mono text-zinc-500 block">
                    Moves History ({gameHistory.length})
                  </span>
                  <p className="font-mono text-zinc-800 leading-tight text-[10px]">
                    {gameHistory.slice(-8).join("  •  ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
