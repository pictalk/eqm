import * as Es from "./defs";

type Nullable<T> = T | null | undefined;

function nonNullableReducer<T>(list: T[], item: Nullable<T>): T[] {
  if (item) {
    list.push(item);
  }

  return list;
}

function filterNullable<T>(x: Nullable<T>[]): T[] {
  let l: T[] = [];

  return x.reduce(nonNullableReducer, l);
}

export function term(key: string, value: any): Es.TermClause {
  return {
    term: { [key]: value },
  };
}

export function terms(key: string, ...values: any[]): Es.TermsClause {
  return {
    terms: { [key]: values },
  };
}

export function range(key: string, value: Es.RangeQuery): Es.RangeClause {
  return {
    range: { [key]: value },
  };
}

export function match(key: string, value: any): Es.MatchClause {
  return {
    match: { [key]: value },
  };
}

export function matchPhrase(key: string, value: any): Es.MatchPhraseClause {
  return {
    match_phrase: { [key]: value },
  };
}

export function matchAll(key: string, value: any): Es.MatchAllClause {
  return {
    match_all: { [key]: value },
  };
}

export function matchNone(key: string, value: any): Es.MatchNoneClause {
  return {
    match_none: { [key]: value },
  };
}

export function must(...clauses: Nullable<Es.Queries>[]): Es.MustClause {
  return {
    must: filterNullable(clauses),
  };
}

export function mustNot(...clauses: Nullable<Es.Queries>[]): Es.MustNotClause {
  return {
    must_not: filterNullable(clauses),
  };
}

export function should(
  minShouldMatch: number,
  ...clauses: Nullable<Es.Queries>[]
): Es.ShouldClause {
  return {
    should: filterNullable(clauses),
    minimum_should_match: minShouldMatch,
  };
}

export function filter(
  ...clauses: (Es.Queries | null | undefined)[]
): Es.FilterClause {
  return {
    filter: filterNullable(clauses),
  };
}

export function bool(...clauses: Nullable<Es.BoolQueries>[]): Es.BoolClause {
  return { bool: Object.assign({}, ...filterNullable(clauses)) };
}

export function query(
  ...clauses: Array<Nullable<Es.Queries | Es.BoolClause>>
): Es.QueryClause {
  return {
    query: Object.assign({}, ...filterNullable(clauses)),
  };
}
