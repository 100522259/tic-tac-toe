function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  /**
   * explanation:
   * export -> makes this function accessible  outside of this file
   * default -> tells other files using your code that it's the main function of the file
   */
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
