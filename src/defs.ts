export type AnyObject = { [key: string]: any };
export type Dictionary<T> = { [key: string]: T };
export type SingleOrList<T> = T | T[];

//* Queries

/**
 * Find documents which contain the **exact** term specified in the field specified.
 *
 * [term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)
 */
export type TermClause = {
  term: AnyObject;
};

/**
 * Find documents which contain any of the **exact** terms
 * specified in the field specified.
 *
 * [term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html)
 */
export type TermsClause = {
  terms: Dictionary<any[]>;
};

/**
 * Find documents where the field specified contains values
 * (dates, numbers, or strings) in the range specified.
 *
 * [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
 */
export type RangeClause = {
  range: RangeQuery;
};

export type RangeQuery = {
  /**
   * Greater-than or equal to
   */
  gte?: number | string;
  /**
   * Greater-than
   */
  gt?: number | string;
  /**
   * Less-than or equal to
   */
  lte?: number | string;
  /**
   * Less-than
   */
  lt?: number | string;
  time_zone?: string;
  format?: string;
  boost?: number;
};

/**
 * The standard query for performing full text queries,
 * including fuzzy matching and phrase or proximity queries.
 *
 * [match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)
 */
export type MatchClause = {
  match: AnyObject;
};

/**
 * Like the match query but used for matching exact phrases or word proximity matches.
 *
 * [match phrase query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html)
 */
export type MatchPhraseClause = {
  match_phrase: AnyObject;
};

export type MatchAllClause = {
  match_all: AnyObject;
};

export type MatchNoneClause = {
  match_none: AnyObject;
};

// TODO: more entries from https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html
// TODO: and here https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html

//* End Queries

export type MustClause = {
  must: Array<Queries>;
};

export type MustNotClause = {
  must_not: Array<Queries>;
};

export type ShouldClause = {
  should: Array<Queries>;
};

export type FilterClause = {
  filter: FilterContext;
};

export type BoolClause = {
  bool: BoolContext;
};

export type BoolContext = Partial<
  FilterClause & MustClause & MustNotClause & ShouldClause
>;

export type BoolQueries =
  | FilterClause
  | MustClause
  | MustNotClause
  | ShouldClause;

export type Queries =
  | TermClause
  | TermsClause
  | RangeClause
  | MatchClause
  | MatchPhraseClause
  | MatchAllClause
  | MatchNoneClause;

export type QueryObj = TermClause &
  TermsClause &
  RangeClause &
  MatchClause &
  MatchPhraseClause &
  MatchAllClause &
  MatchNoneClause;

/**
 * **Filter context**
 *
 * In filter context, a query clause answers the question
 * “Does this document match this query clause?”
 * The answer is a simple Yes or No — no scores are calculated.
 * Filter context is mostly used for filtering structured data, e.g.
 * - Does this timestamp fall into the range 2015 to 2016?
 * - Is the status field set to "published"?
 *
 * Frequently used filters will be cached automatically by Elasticsearch,
 * to speed up performance.
 *
 * Filter context is in effect whenever a query clause is passed
 * to a filter parameter, such as the filter or must_not parameters
 * in the [bool query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html),
 * the `filter` parameter in the [constant_score](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html) query,
 * or the [filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html) aggregation.
 */
export type FilterContext = Array<Queries>;

/**
 * **Query context**
 *
 * A query clause used in query context answers the question
 * “How well does this document match this query clause?”
 * Besides deciding whether or not the document matches,
 * the query clause also calculates a _score representing
 * how well the document matches, relative to other documents.
 *
 * Query context is, in effect, whenever a query clause is passed
 * to a query parameter, such as the query parameter in the [search API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-query.html).
 */
export type QueryContext = Partial<QueryObj & BoolContext>;

export type QueryClause = {
  query: QueryContext;
};
