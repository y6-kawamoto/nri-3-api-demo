# nri-3-api-demo

## アプリケーション概要

Code Chrysalis(nri-3)の参加者情報を操作する API を提供します。

<br>

## API 仕様

### ■ 1.参加者情報取得 API

Code Chrysalis(nri-3)の参加者情報を取得する機能を提供します。

**リクエスト URL**

```
GET /users/:id
```

**リクエストパラメータ**

```
なし
```

**レスポンスフィールド**

| フィールド名 | 説明                            |
| ------------ | ------------------------------- |
| ID           | 参加者の ID                     |
| lastName     | 参加者の姓                      |
| firstName    | 参加者の名                      |
| origin       | 参加者の出身                    |
| interesting1 | 参加者についての興味深いこと\_1 |
| interesting2 | 参加者についての興味深いこと\_1 |

<br>

### ■ 2.参加者情報登録 API

Code Chrysalis(nri-3)の参加者情報を登録する機能を提供します。

<br>

**リクエスト URL**

```
POST /users
```

<br>

**リクエストパラメータ**

| フィールド名 | 説明                            |
| ------------ | ------------------------------- |
| lastName     | 参加者の姓                      |
| firstName    | 参加者の名                      |
| origin       | 参加者の出身                    |
| interesting1 | 参加者についての興味深いこと\_1 |
| interesting2 | 参加者についての興味深いこと\_1 |

<br>

**レスポンスフィールド**

| フィールド名 | 説明        |
| ------------ | ----------- |
| ID           | 参加者の ID |

<br>

### ■ 3.参加者情報更新 API

Code Chrysalis(nri-3)の参加者情報を更新する機能を提供します。

<br>

**リクエスト URL**

```
PUT /users/:id
```

<br>

**リクエストパラメータ**  
　※更新したい情報のみフィールドに設定してください。

| フィールド名 | 説明                            |
| ------------ | ------------------------------- |
| lastName     | 参加者の姓                      |
| firstName    | 参加者の名                      |
| origin       | 参加者の出身                    |
| interesting1 | 参加者についての興味深いこと\_1 |
| interesting2 | 参加者についての興味深いこと\_1 |

<br>

**レスポンスフィールド**

| フィールド名 | 説明        |
| ------------ | ----------- |
| ID           | 参加者の ID |

<br>

<br>

### ■ 4.参加者情報削除 API

Code Chrysalis(nri-3)の参加者情報を削除する機能を提供します。

**リクエスト URL**

```
DELETE /users/:id
```

**リクエストパラメータ**

```
なし
```

**レスポンスフィールド**

| フィールド名 | 説明        |
| ------------ | ----------- |
| ID           | 参加者の ID |

<br>

## DB 仕様

### ■ 参加者 TBL（participant)

| カラム名      | データ型   | 説明                            |
| ------------- | ---------- | ------------------------------- |
| id            | serial     | 参加者の ID                     |
| first_name    | string(32) | 参加者の名                      |
| last_name     | string(32) | 参加者の姓                      |
| origin        | string(32) | 参加者の出身地                  |
| interesting_1 | text       | 参加者についての興味深いこと\_1 |
| interesting_2 | text       | 参加者についての興味深いこと\_1 |
| warnings      | intger     | 警告回数                        |
