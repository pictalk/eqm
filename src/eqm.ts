import * as Es from "./defs";

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

export function must(...clauses: Es.Queries[]): Es.MustClause {
  return {
    must: clauses,
  };
}

export function mustNot(...clauses: Es.Queries[]): Es.MustNotClause {
  return {
    must_not: clauses,
  };
}

export function should(...clauses: Es.Queries[]): Es.ShouldClause {
  return {
    should: clauses,
  };
}

export function filter(...clauses: Es.Queries[]): Es.FilterClause {
  return {
    filter: clauses,
  };
}

export function bool(...clauses: Es.BoolQueries[]): Es.BoolClause {
  return { bool: Object.assign({}, ...clauses) };
}

export function query(
  ...clauses: Array<Es.Queries | Es.BoolClause>
): Es.QueryClause {
  return {
    query: Object.assign({}, ...clauses),
  };
}
