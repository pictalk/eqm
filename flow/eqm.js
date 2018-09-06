// @flow

declare module "@pictalk/eqm" {
  declare export type Dictionary<T> = { [key: string]: T };
  declare export type AnyObject = { [key: string]: any };
  declare export type SingleOrList<T> = T | T[];

  //* Queries

  /**
   * Find documents which contain the **exact** term specified in the field specified.
   *
   * [term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)
   */
  declare export type TermClause = {
    term: AnyObject,
  };

  /**
   * Find documents which contain any of the **exact** terms
   * specified in the field specified.
   *
   * [term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html)
   */
  declare export type TermsClause = {
    terms: Dictionary<any[]>,
  };

  /**
   * Find documents where the field specified contains values
   * (dates, numbers, or strings) in the range specified.
   *
   * [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
   */
  declare export type RangeClause = {
    range: RangeQuery,
  };

  declare export type RangeQuery = {
    /**
     * Greater-than or equal to
     */
    gte?: number | string,
    /**
     * Greater-than
     */
    gt?: number | string,
    /**
     * Less-than or equal to
     */
    lte?: number | string,
    /**
     * Less-than
     */
    lt?: number | string,
    time_zone?: string,
    format?: string,
    boost?: number,
  };

  /**
   * The standard query for performing full text queries,
   * including fuzzy matching and phrase or proximity queries.
   *
   * [match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)
   */
  declare export type MatchClause = {
    match: AnyObject,
  };

  /**
   * Like the match query but used for matching exact phrases or word proximity matches.
   *
   * [match phrase query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html)
   */
  declare export type MatchPhraseClause = {
    match_phrase: AnyObject,
  };

  declare export type MatchAllClause = {
    match_all: AnyObject,
  };

  declare export type MatchNoneClause = {
    match_none: AnyObject,
  };

  // TODO: more entries from https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html
  // TODO: and here https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html

  //* End Queries

  declare export type MustClause = {
    must: Array<Queries>,
  };

  declare export type MustNotClause = {
    must_not: Array<Queries>,
  };

  declare export type ShouldClause = {
    should: Array<Queries>,
    minimum_should_match: number,
  };

  declare export type FilterClause = {
    filter: FilterContext,
  };

  declare export type BoolClause = {
    bool: BoolContext,
  };

  declare export type BoolContext = {
    ...FilterClause,
    ...MustClause,
    ...MustNotClause,
    ...ShouldClause,
  };

  declare export type BoolQueries =
    | FilterClause
    | MustClause
    | MustNotClause
    | ShouldClause;

  declare export type Queries =
    | TermClause
    | TermsClause
    | RangeClause
    | MatchClause
    | MatchPhraseClause
    | MatchAllClause
    | MatchNoneClause;

  declare export type QueryObj = TermClause &
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
   * The answer is a simple Yes or No--no scores are calculated.
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
  declare export type FilterContext = Array<Queries>;

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
  declare export type QueryContext = { ...QueryObj, ...BoolContext };

  declare export type QueryClause = {
    query: QueryContext,
  };

  declare export function term(key: string, value: any): TermClause;
  declare export function terms(key: string, ...values: any[]): TermsClause;
  declare export function range(key: string, value: RangeQuery): RangeClause;
  declare export function match(key: string, value: any): MatchClause;
  declare export function matchPhrase(
    key: string,
    value: any,
  ): MatchPhraseClause;
  declare export function matchAll(key: string, value: any): MatchAllClause;
  declare export function matchNone(key: string, value: any): MatchNoneClause;
  declare export function must(...clauses: (?Queries)[]): MustClause;
  declare export function mustNot(...clauses: (?Queries)[]): MustNotClause;
  declare export function should(
    minShouldMatch: number,
    ...clauses: (?Queries)[]
  ): ShouldClause;
  declare export function filter(...clauses: (?Queries)[]): FilterClause;
  declare export function bool(...clauses: (?BoolQueries)[]): BoolClause;
  declare export function query(
    ...clauses: Array<?(Queries | BoolClause)>
  ): QueryClause;
}
