import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');
const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yml');

const stylishDiffPath = getFixturePath('expected.stylish.diff.txt');
const plainDiffPath = getFixturePath('expected.plain.diff.txt');
const jsonDiffPath = getFixturePath('expected.json.diff.txt');

test('should return diff in stylish format', () => {
  const diffJson = gendiff(jsonFilepath1, jsonFilepath2, 'stylish');
  const diffYAML = gendiff(yamlFilepath1, yamlFilepath2, 'stylish');
  const expectedStylishDiff = fs.readFileSync(stylishDiffPath, 'utf8');
  expect(diffJson).toBe(expectedStylishDiff);
  expect(diffYAML).toBe(expectedStylishDiff);
});

test('should return diff in plain format', () => {
  const diffJson = gendiff(jsonFilepath1, jsonFilepath2, 'plain');
  const diffYAML = gendiff(yamlFilepath1, yamlFilepath2, 'plain');
  const expectedPlainDiff = fs.readFileSync(plainDiffPath, 'utf8');
  expect(diffJson).toBe(expectedPlainDiff);
  expect(diffYAML).toBe(expectedPlainDiff);
});

test('should return diff in json format', () => {
  const diffJson = gendiff(jsonFilepath1, jsonFilepath2, 'json');
  const diffYAML = gendiff(yamlFilepath1, yamlFilepath2, 'json');
  const expectedJsonDiff = fs.readFileSync(jsonDiffPath, 'utf8');
  expect(diffJson).toBe(expectedJsonDiff);
  expect(diffYAML).toBe(expectedJsonDiff);
});
