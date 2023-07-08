import { Body, Controller, Get, Post, Redirect } from '@nestjs/common'
import { AppService } from './app.service'
import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import { Form16Data } from './dto/form16.data.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { DatamatrixRequestDto } from './dto/datamatrix.request.dto'
import { DepartmentDto } from './dto/department.dto'
import { pathToStatic } from './utils/pathToStatic'
import path from 'path'
import { readFileAsync } from './utils/readFileAsync'
import { microservices, msHttpAddress } from './utils/msAddress'
import * as E from 'fp-ts/es6/Either'
import { AuthRoutes } from '../../identity/src/auth/auth.controller'

enum kk {
	'auth' = 'auth',
	'kk' = 'kk',
}

const fetchMs = <
	T extends microservices,
	DEST extends keyof typeof AuthRoutes = T extends 'identity'
		? keyof typeof AuthRoutes
		: never,
>(
	ms: T,
	dest: DEST,
): E.Either<never, Promise<Response>> => {
	try {
		return pipe(fetch(msHttpAddress(ms) + dest), E.right)
	} catch (error) {
		E.left(error)
	}
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	// @Redirect('http://localhost/api', 301)
	getHello() {
		return 'sss'
	}

	@Post()
	loginUser() {
		fetchMs('identity', '/login')
	}
}
