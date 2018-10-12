import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  deckNum = 1; //You can change the number of deck here;
  number = 10;
  cards = [];
  currentCards = [];
  filterCards = [];
  drawCount = 0;
  // remindInfo = "Please Draw a Card";
  // filterButtonText = [
  //   "Possible Card Suit",
  //   "# of Cards in a hand",
  //   "Max Card Value",
  //   "Min Card Value"
  // ];
  filterButtonStatus = [false, false, false, false];
  PossibleSuitStatus = [true, true, true, true];
  // selectedFilterInfo = null;
  selectedResult = null;
  // selectFilterIndex = 0;

  constructor() {
    this.initialCardsObject();
  }

  //intial full deck;
  initialCardsObject() {
    for (let i = 0; i < 52; i++) {
      if (i < 13) {
        this.cards.push({ suit: "D", value: i + 1 });
      } else if (i >= 13 && i < 26) {
        this.cards.push({ suit: "C", value: i - 13 + 1 });
      } else if (i >= 26 && i < 39) {
        this.cards.push({ suit: "H", value: i - 26 + 1 });
      } else {
        this.cards.push({ suit: "S", value: i - 39 + 1 });
      }
    }
    let count = this.deckNum;
    while (count > 1) {
      this.cards = this.cards.concat(this.cards);
      count--;
    }
    this.shuffleCard(this.cards);
  }

  //shuffle cards;
  shuffleCard(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  //draw a card;
  drawCard() {
    this.currentCards.push(this.cards[this.drawCount]);
    this.drawCount++;
    if (this.drawCount === 52 * this.deckNum) {
      alert("Shuffle Now?");
      this.currentCards = [];
      this.shuffleCard(this.cards);
    }
    this.callFilterHanders();
  }

  callFilterHanders() {
    this.filterCards = this.currentCards;
    this.getPossibleSuit(-1);
    this.filterMaxMin();
  }

  filterMaxMin() {
    let arr = [];
    if (this.filterButtonStatus[2]) {
      arr = arr.concat(this.getMax(this.filterCards));
    }
    if (this.filterButtonStatus[3]) {
      arr = arr.concat(this.getMin(this.filterCards));
    }
    if (this.filterButtonStatus[2] || this.filterButtonStatus[3]) {
      this.filterCards = arr;
    }
  }

  showSuits() {
    this.filterButtonStatus[0] = !this.filterButtonStatus[0];
    if (!this.filterButtonStatus[0]) {
      this.PossibleSuitStatus = [true, true, true, true];
      this.getPossibleSuit(-1);
    }
  }

  showCardNumber() {
    this.filterButtonStatus[1] = !this.filterButtonStatus[1];
  }

  showMaxNumber() {
    this.filterButtonStatus[2] = !this.filterButtonStatus[2];
    this.callFilterHanders();
  }

  showMinNumber() {
    this.filterButtonStatus[3] = !this.filterButtonStatus[3];
    this.callFilterHanders();
  }

  getPossibleSuit(index) {
    this.filterCards = this.currentCards;
    if (index >= 0) {
      this.PossibleSuitStatus[index] = !this.PossibleSuitStatus[index];
    }
    let suit = null;
    let arr = [];
    if (this.PossibleSuitStatus[0]) {
      suit = "D";
      arr = arr.concat(this.filterSuit(this.filterCards, suit));
    }
    if (this.PossibleSuitStatus[1]) {
      suit = "C";
      arr = arr.concat(this.filterSuit(this.filterCards, suit));
    }
    if (this.PossibleSuitStatus[2]) {
      suit = "H";
      arr = arr.concat(this.filterSuit(this.filterCards, suit));
    }
    if (this.PossibleSuitStatus[3]) {
      suit = "S";
      arr = arr.concat(this.filterSuit(this.filterCards, suit));
    }

    this.filterCards = arr;
    this.filterMaxMin();
  }

  filterSuit(array, suit) {
    array = array.filter(a => a.suit === suit);
    return array;
  }

  getMax(array) {
    let arr = [];
    for (let item of array) {
      if (arr.length === 0) {
        arr.push(item);
      } else {
        if (arr[arr.length - 1].value < item.value) {
          arr = [];
          arr.push(item);
        } else if (arr[arr.length - 1].value === item.value) {
          arr.push(item);
        }
      }
    }
    return arr;
  }

  getMin(array) {
    let arr = [];
    for (let item of array) {
      if (arr.length === 0) {
        arr.push(item);
      } else {
        if (arr[arr.length - 1].value > item.value) {
          arr = [];
          arr.push(item);
        } else if (arr[arr.length - 1].value === item.value) {
          arr.push(item);
        }
      }
    }
    return arr;
  }
}
