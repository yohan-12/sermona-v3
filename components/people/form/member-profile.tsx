"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createMember } from "@/lib/actions";
import Link from "next/link";
const ProfileForm = () => {


  return (
    <Card className="container mx-auto border rounded-md shadow w-2/3">
      <form action={createMember}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">신규 교인 등록</CardTitle>
          <CardDescription>
            아래 양식을 작성하여 새로운 회원을 추가하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="name" className="whitespace-nowrap w-32">
                이름
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="family-head" className="whitespace-nowrap w-32">
                가족대표
              </Label>
              <Input id="family-head" name="familyHead" type="text" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="id-number" className="whitespace-nowrap w-32">
                주민번호
              </Label>
              <Input
                id="id-number"
                name="ssn"
                type="text"
                placeholder="123456-1234567"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label
                className="
            whitespace-nowrap w-32"
              >
                성별
              </Label>
              <Select defaultValue="male" name="gender" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="남자">남자</SelectItem>
                  <SelectItem value="여자">여자</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="birthdate" className="whitespace-nowrap w-32">
                생년월일
              </Label>
              <Input id="birthdate" type="date" name="birthdate" />
            </div>
            <div className="flex items-center gap-2">
              <Label
                className="
            whitespace-nowrap w-32"
              >
                음/양
              </Label>
              <Select defaultValue="billing" name="solarLunarType">
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="양력">양력</SelectItem>
                  <SelectItem value="음력">음력</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap w-32">구역</Label>
              <Input type="text" placeholder="" name="cellgroup" />
            </div>
            <div className="flex items-center gap-2">
              <Label
                className="
            whitespace-nowrap w-32"
              >
                현직분
              </Label>
              <Select defaultValue="billing" name="dutyInChurch">
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="목사">목사</SelectItem>
                  <SelectItem value="장로">장로</SelectItem>
                  <SelectItem value="권사">권사</SelectItem>
                  <SelectItem value="안수집사">안수집사</SelectItem>
                  <SelectItem value="집사">집사</SelectItem>
                  <SelectItem value="전도사">전도사</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="birthdate" className="whitespace-nowrap w-32">
                등록일
              </Label>
              <Input type="date" name="registeredDate" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap w-32">휴대폰</Label>
              <Input type="tel" placeholder="010-1234-1234" name="phone" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-left whitespace-nowrap w-32">주소</Label>
              <Textarea name="address" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-left whitespace-nowrap w-32">
                추가 정보
              </Label>
              <Textarea placeholder="" name="notes" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-3">
          <div className="flex-1">
            <Link href={"/dashboard/people"} className="w-full">
              <Button variant="outline" className="w-full">
                취소
              </Button>
            </Link>
          </div>
          <div className="flex-1">
            <Button variant="default" className="w-full" type="submit">
              교인추가하기
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
