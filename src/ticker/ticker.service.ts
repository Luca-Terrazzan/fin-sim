import moment from 'moment';

type TimeStep = 'day' | 'month' | 'year';

/**
 * A service to represent time progress
 */
export default class TickerService implements Iterator<Date> {
  #minimumStep: TimeStep;

  #currentDate: moment.Moment;

  #simulationLength: number;

  #index = 0;

  #done: boolean = false;

  public constructor(
    minimumStep: TimeStep,
    simulationLength: number,
  ) {
    this.#minimumStep = minimumStep;
    this.#currentDate = moment();
    this.#simulationLength = simulationLength;
  }

  next(): IteratorResult<Date> {
    // Iteration is finished, return last item
    if (!this.#done) {
      // Increase current step
      this.#index += 1;
      this.#currentDate = this.generateIncrement();

      // Iteration should finish with this step
      if (this.#index === this.#simulationLength) {
        this.#done = true;
      }
    }

    return {
      done: this.#done,
      value: this.getCurrentDate(),
    };
  }

  private getCurrentDate(): Date {
    return this.#currentDate.toDate();
  }

  private generateIncrement(): moment.Moment {
    switch (this.#minimumStep) {
      case 'day': return this.#currentDate.add(1, 'day');
      case 'month': return this.#currentDate.add(1, 'month');
      case 'year': return this.#currentDate.add(1, 'year');
      default: return this.#currentDate;
    }
  }
}
