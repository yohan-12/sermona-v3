"use client";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
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
import Link from "next/link";
import { updateMember } from "@/lib/actions";

import { Database } from "@/types/supabase";
import { FormEvent, useRef, useState } from "react";
type MemberType = Database["public"]["Tables"]["member"]["Row"];
const EditForm = ({ member }: { member: MemberType }) => {
  const updateMemberWithId = updateMember.bind(null, member.id);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [address, setAddress] = useState(member.address || "");
   const addressTextareaRef = useRef<HTMLTextAreaElement>(null);
    const handleAddressChange = (event: any) => {
      setAddress(event.target.value);
    };
    const handleAddressSearch = () => {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          var addr = ""; // 주소 변수
          var extraAddr = ""; // 참고항목 변수
          let fullAddr;

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
          }

          // 조합된 전체 주소를 만든다.
          fullAddr = "(" + data.zonecode + ")\n" + addr + extraAddr;
          setAddress(fullAddr);
          if (addressTextareaRef.current) {
            addressTextareaRef.current.focus();
          }
          // You can access other data returned by the API, like zonecode for postal code
        },
      }).open();
    };
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setIsLoading(true);
        try {
            const updateMemberWithId = updateMember.bind(null, member.id);
            await updateMemberWithId(formData)
        } catch (error) {
          console.error("Form submission error:", error);
        }
        setIsLoading(false);
      };
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <Card className="container mx-auto border rounded-md shadow w-2/3">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">교인 정보 편집</CardTitle>
            <CardDescription>회원 정보를 업데이트 하세요</CardDescription>
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
                  defaultValue={member.name}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="family-head" className="whitespace-nowrap w-32">
                  가족대표
                </Label>
                <Input
                  id="family-head"
                  name="familyHead"
                  type="text"
                  defaultValue={member.familyHead || ""}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="id-number" className="whitespace-nowrap w-32">
                  주민번호
                </Label>
                <Input
                  id="id-number"
                  name="ssn"
                  type="text"
                  placeholder="xxxxxx-xxxxxxx"
                  defaultValue={member.ssn || ""}
                />
              </div>

              <div className="flex items-center gap-2">
                <Label
                  className="
            whitespace-nowrap w-32"
                >
                  성별
                </Label>
                <Select defaultValue={member.gender || ""} name="gender">
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
                <Input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  defaultValue={member.birthday || ""}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label
                  className="
            whitespace-nowrap w-32"
                >
                  음/양
                </Label>
                <Select
                  defaultValue={member.solarLunarType || ""}
                  name="solarLunarType"
                >
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
                <Input
                  type="text"
                  placeholder=""
                  name="cellgroup"
                  defaultValue={member.cellGroup || ""}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label
                  className="
            whitespace-nowrap w-32"
                >
                  현직분
                </Label>
                <Select
                  defaultValue={member.dutyInChurch || ""}
                  name="dutyInChurch"
                >
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
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="birthdate" className="whitespace-nowrap w-32">
                  등록일
                </Label>
                <Input
                  type="date"
                  name="registeredDate"
                  defaultValue={member.registeredDate || ""}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="whitespace-nowrap w-32">휴대폰</Label>
                <Input
                  type="tel"
                  placeholder="010-1234-1234"
                  name="phone"
                  defaultValue={member.phone || ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-3">
                {/* <Label className="text-left whitespace-nowrap w-32">주소</Label>
              <Textarea
                placeholder="서울시..."
                name="address"
                defaultValue={member.address || ""}
              /> */}
                <Label className="text-left whitespace-nowrap w-32">주소</Label>
                <Textarea
                  name="address"
                  onChange={handleAddressChange}
                  ref={addressTextareaRef}
                  value={address}
                />
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleAddressSearch}
                >
                  우편변호 검색
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-left whitespace-nowrap w-32">
                  추가 정보
                </Label>
                <Textarea
                  placeholder=""
                  name="notes"
                  defaultValue={member.notes || ""}
                />
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
              <Button
                variant="default"
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                저장
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default EditForm;
