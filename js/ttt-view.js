function View(game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
}

View.prototype.bindEvents = function () {
  const $sqs = $('.square');
  console.log($sqs);

  $sqs.on('click', event => {

    let $targetEl = $(event.currentTarget);

    if ($targetEl.text().length === 0) {
      $targetEl.text(this.game.currentPlayer);
      this.makeMove($targetEl);
      $targetEl.attr("style", "background-color: white");

      if (this.game.winner()) {
        alert(`${this.game.winner()} WINS!`);
        $sqs.off('click');
      }
    } else {
      alert('Invalid Move');
    }
  });
};

View.prototype.makeMove = function ($square) {
  let pos = $square.attr('data-pos').split(",");
  console.log(pos);
  this.game.playMove(pos);
  this.game.board.print();

};

View.prototype.setupBoard = function () {

  for (let i = 0; i < 3; i++) {
    const $row = $("<ul>").addClass('row').addClass('group');
    for (let j = 0; j < 3; j++) {
      const $sq = $("<li>").addClass('square').attr('data-pos',[i,j]);
      $row.append($sq);
    }
    this.$el.append($row);
  }

  this.bindEvents();
};

module.exports = View;
